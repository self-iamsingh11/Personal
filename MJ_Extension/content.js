let isPaused = false;

// Safe wrapper to prevent "Extension context invalidated" errors when changing/reloading the extension
function safeSendMessage(message) {
    try {
        if (chrome && chrome.runtime && chrome.runtime.id) {
            // Check if the sendMessage call returns a promise (Manifest V3 behavior)
            const result = chrome.runtime.sendMessage(message);
            if (result && typeof result.catch === 'function') {
                result.catch(() => { }); // Suppress promise rejection in orphaned scripts
            }
        }
    } catch (e) {
        // Silently catch orphaned script errors
    }
}

// We must register the listener at the top level without wrapping it in a condition 
// that checks chrome.runtime.id, otherwise it fails to register on initial load sometimes.
// But we *do* check it inside the callback.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
        if (!chrome || !chrome.runtime || !chrome.runtime.id) return;

        if (message.action === 'extract') {
            isPaused = false;
            extractPrompts(message.keyword);
        } else if (message.action === 'executeBatch') {
            isPaused = false;
            executePrompts(message.batch);
        } else if (message.action === 'pauseScript') {
            isPaused = true;
        } else if (message.action === 'resumeScript') {
            isPaused = false;
        }
    } catch (e) {
        // Suppress orphaned listener errors
    }
});

function log(msg, type = 'info') {
    safeSendMessage({ action: 'log', msg: msg, type: type });
    console.log(`[MJ Automator] ${msg}`);
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper to block execution while paused
async function checkPause() {
    while (isPaused) {
        await sleep(500);
    }
}

// Fast Hours Tracking System — uses Midjourney API instead of DOM scraping
let fastHoursInterval = null;

async function fetchFastHours() {
    try {
        // Timeout the fetch after 10 seconds to prevent hanging the event loop
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch('https://www.midjourney.com/api/user-account', {
            credentials: 'include',
            headers: {
                'x-csrf-protection': '1'
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            log(`Fast Hours API returned ${response.status}`, 'error');
            safeSendMessage({ action: 'updateFastHours', text: `API error (${response.status})` });
            return;
        }

        const data = await response.json();

        // Fields are nested under userData
        const ud = data?.userData;
        if (ud) {
            const remainingMs = ud.total_credits || 0;
            const totalMs = ud.plan?.credit_allocation || 0;

            const remainingHours = Math.floor(remainingMs / 3600000);
            const remainingMinutes = Math.floor((remainingMs % 3600000) / 60000);
            const totalHours = Math.floor(totalMs / 3600000);

            const text = `${remainingHours}h ${remainingMinutes}m / ${totalHours}h`;
            safeSendMessage({ action: 'updateFastHours', text: text });
            log(`Fast Hours updated: ${text}`, 'success');
        } else {
            log('Fast Hours: userData not found in API response', 'error');
            safeSendMessage({ action: 'updateFastHours', text: 'Could not parse API data' });
        }
    } catch (err) {
        if (!chrome.runtime?.id) return; // Ignore if orphaned

        if (err.name === 'AbortError') {
            log('Fast Hours fetch timed out', 'warning');
        } else {
            log(`Fast Hours fetch error: ${err.message}`, 'error');
        }
        safeSendMessage({ action: 'updateFastHours', text: 'Fetch failed' });
    }
}

// Start checking every 2 minutes (120000 ms), and run once immediately
function startFastHoursMonitor() {
    if (!chrome.runtime?.id) return; // Don't start if orphaned
    if (fastHoursInterval) clearInterval(fastHoursInterval);
    fetchFastHours();
    fastHoursInterval = setInterval(() => {
        if (!chrome.runtime?.id) {
            clearInterval(fastHoursInterval);
            return;
        }
        fetchFastHours();
    }, 120000);
}

function stopFastHoursMonitor() {
    if (fastHoursInterval) {
        clearInterval(fastHoursInterval);
        fastHoursInterval = null;
    }
}

// Initialize monitor when content script runs
startFastHoursMonitor();

async function extractPrompts(keyword) {
    stopFastHoursMonitor(); // Pause fast hours during extraction to prevent interference
    log(`Initializing extraction for: "${keyword}"`, 'info');
    safeSendMessage({ action: 'updateStatus', text: 'Setting up search...' });

    if (!window.location.href.includes('/explore')) {
        log('Not on /explore. Redirecting...', 'info');
        window.location.href = `https://www.midjourney.com/explore?search=${encodeURIComponent(keyword)}`;
        return;
    }

    try {
        log('Checking for "Images" filter tab...', 'info');
        const buttons = Array.from(document.querySelectorAll('button'));
        const imagesBtn = buttons.find(b => b.textContent && b.textContent.trim() === 'Images');
        if (imagesBtn) {
            log('Found "Images" tab, ensuring it is clicked.', 'info');
            imagesBtn.click();
            await sleep(1000);
        } else {
            log('Could not find explicitly named "Images" tab, continuing anyway.', 'error');
        }

        log('Looking for search input...', 'info');
        const searchInput = document.querySelector('input[placeholder="Search Images"]') || document.querySelector('input[type="text"]');

        if (searchInput) {
            log('Search input found. Injecting keyword.', 'success');
            const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
            if (valueSetter) {
                valueSetter.call(searchInput, keyword);
            } else {
                searchInput.value = keyword;
            }
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            await sleep(500);

            log('Dispatching Enter key to trigger search...', 'info');
            searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
            await sleep(4000);
            log('Waiting for search results to load...', 'info');
        } else {
            log('Error: Cannot find Search Input. If URL has query, continuing to scrape...', 'error');
        }

        safeSendMessage({ action: 'updateStatus', text: 'Extracting prompts from grid...' });

        let extracted = [];
        let processedIds = new Set();
        let scrollContainer = document.querySelector('#pageScroll') || document.documentElement || window;
        let retries = 0;

        log('Beginning grid scan loop.', 'info');

        while (extracted.length < 100 && retries < 15) {
            await checkPause(); // 🔴 PAUSE CHECK

            const imageLinks = Array.from(document.querySelectorAll('a[href^="/jobs/"]'));
            let foundNew = false;

            for (let link of imageLinks) {
                await checkPause(); // 🔴 PAUSE CHECK

                if (extracted.length >= 100) break;

                const href = link.getAttribute('href');
                if (processedIds.has(href)) continue;

                processedIds.add(href);
                foundNew = true;

                link.scrollIntoView({ behavior: 'smooth', block: 'center' });
                await sleep(400);

                log(`Opening modal for job: ${href.split('/').pop().split('?')[0]}`, 'info');
                link.click();
                await sleep(2000);

                let promptText = "";
                const exactEl = document.querySelector('.relative.break-words.text-sm.font-medium.leading-relaxed > p');

                if (exactEl && exactEl.textContent) {
                    promptText = exactEl.textContent.trim();
                } else {
                    const fallbackEls = Array.from(document.querySelectorAll('p')).filter(p => p.textContent && p.textContent.length > 20);
                    if (fallbackEls.length > 0) {
                        promptText = fallbackEls[0].textContent.trim();
                    }
                }

                if (promptText) {
                    extracted.push(promptText);
                    log(`Extracted [${extracted.length}/100]: ${promptText.substring(0, 40)}...`, 'success');
                    safeSendMessage({ action: 'updateStatus', text: `Extracted ${extracted.length}/100 prompts` });
                } else {
                    log('Failed to find prompt text in modal.', 'error');
                }

                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true }));

                const closeBtnSelectors = [
                    'button[title="Close"]',
                    'button[aria-label="Close"]',
                    'svg path[d*="M19 6.41"]' // typical close X icon path
                ];
                let clickedClose = false;
                for (let selector of closeBtnSelectors) {
                    let btn = document.querySelector(selector);
                    if (btn) {
                        const clickable = btn.closest('button') || btn;
                        clickable.click();
                        clickedClose = true;
                        break;
                    }
                }

                if (!clickedClose) {
                    const fallbackBtns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent === 'Close');
                    if (fallbackBtns.length > 0) fallbackBtns[0].click();
                }

                await sleep(600);
            }

            if (!foundNew) {
                retries++;
                log(`No new unread images found. Scrolling down... (Retry ${retries}/15)`, 'info');
                if (typeof scrollContainer.scrollBy === 'function') {
                    scrollContainer.scrollBy(0, 1500);
                } else {
                    window.scrollBy(0, 1500);
                }
                await sleep(3000);
            } else {
                retries = 0;
            }
        }

        if (extracted.length === 0) {
            log('Failed to extract any prompts. Stuck or DOM changed.', 'error');
            safeSendMessage({ action: 'updateStatus', text: 'Failed to extract any prompts.' });
        } else {
            log(`Extraction complete! Successfully collected ${extracted.length} prompts.`, 'success');
            safeSendMessage({ action: 'extractionComplete', prompts: extracted });
        }

    } catch (err) {
        log(`Fatal Error in extraction loop: ${err.message}`, 'error');
        safeSendMessage({ action: 'updateStatus', text: `Error: ${err.message}` });
        safeSendMessage({ action: 'extractionComplete', prompts: [] });
    } finally {
        startFastHoursMonitor(); // Resume fast hours monitoring after extraction
    }
}

async function executePrompts(batch) {
    stopFastHoursMonitor(); // Pause fast hours during execution to prevent interference
    log(`Starting execution of batch (${batch.length} prompts)...`, 'info');
    safeSendMessage({ action: 'updateStatus', text: `Running batch of ${batch.length}...` });

    for (let i = 0; i < batch.length; i++) {
        await checkPause(); // 🔴 PAUSE CHECK

        const prompt = batch[i];
        log(`Executing [${i + 1}/${batch.length}]: ${prompt.substring(0, 30)}...`, 'info');

        const inputField = document.querySelector('#desktop_input_bar') || document.querySelector('textarea');

        if (inputField) {
            inputField.focus();

            const taSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
            const inSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;

            if (inputField.tagName.toLowerCase() === 'textarea' && taSetter) {
                taSetter.call(inputField, prompt);
            } else if (inputField.tagName.toLowerCase() === 'input' && inSetter) {
                inSetter.call(inputField, prompt);
            } else {
                inputField.value = prompt;
            }

            inputField.dispatchEvent(new Event('input', { bubbles: true }));
            await sleep(500);

            inputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
            await sleep(200);
            inputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));

            log(`Successfully submitted prompt ${i + 1}.`, 'success');
            safeSendMessage({ action: 'updateStatus', text: `Submitted ${i + 1}/${batch.length} in this batch` });

        } else {
            log('Error: Cannot find input bar (#desktop_input_bar).', 'error');
            safeSendMessage({ action: 'updateStatus', text: 'Error: Cannot find input bar.' });
            safeSendMessage({ action: 'batchComplete' });
            return;
        }

        await checkPause(); // 🔴 PAUSE CHECK before the long wait

        // Random delay between 15000ms (15s) and 30000ms (30s)
        const delayMs = Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000;
        const delaySeconds = (delayMs / 1000).toFixed(1);

        log(`Waiting ${delaySeconds} seconds before next submission...`, 'info');

        // Wait incrementally so we can pause mid-wait if needed
        let waited = 0;
        while (waited < delayMs) {
            await checkPause();
            await sleep(500);
            waited += 500;
        }
    }

    log('Batch execution complete!', 'success');
    safeSendMessage({ action: 'batchComplete' });
    startFastHoursMonitor(); // Resume fast hours monitoring after execution
}
