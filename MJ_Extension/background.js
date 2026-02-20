let prompts = [];
let currentIndex = 0;
const BATCH_SIZE = 10;

// Initialize side panel behavior
chrome.runtime.onInstalled.addListener(() => {
    if (chrome.sidePanel) {
        chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(console.error);
    }
});

// Listen for messages from sidebar and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startExtraction') {
        // Reset state and store keyword
        chrome.storage.local.set({
            isExtracting: true,
            prompts: [],
            statusText: `Initiating search for: ${message.keyword}`
        });

        // Send message to active tab to start extraction
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'extract', keyword: message.keyword })
                    .catch(err => {
                        console.log('Message sending failed (content script may not be loaded):', err);

                        // If it fails to reach the content script, reset the UI state so it doesn't stay stuck
                        const errorStatus = 'Error: Content script not found. Please refresh Midjourney tab.';
                        chrome.storage.local.set({ isExtracting: false, statusText: errorStatus });
                        chrome.runtime.sendMessage({ action: 'updateSidebar', statusText: errorStatus, extractionDone: true })
                            .catch(() => { });
                    });
            } else {
                chrome.storage.local.set({ isExtracting: false, statusText: 'Error: No active tab found.' });
                chrome.runtime.sendMessage({ action: 'updateSidebar', statusText: 'Error: No active tab found.', extractionDone: true })
                    .catch(() => { });
            }
        });
    }
    else if (message.action === 'extractionComplete') {
        prompts = message.prompts || [];
        currentIndex = 0;
        const status = `Extracted ${prompts.length} prompts. Ready to execute.`;

        chrome.storage.local.set({
            isExtracting: false,
            prompts: prompts,
            statusText: status
        });

        chrome.runtime.sendMessage({ action: 'updateSidebar', statusText: status, extractionDone: true })
            .catch(() => { }); // Suppress error if sidebar is closed
    }
    else if (message.action === 'startExecution') {
        chrome.storage.local.set({ isExecuting: true });
        executeNextBatch();
    }
    else if (message.action === 'batchComplete') {
        chrome.storage.local.set({ isExecuting: false });
        chrome.runtime.sendMessage({
            action: 'updateSidebar',
            statusText: `Batch Complete. ${currentIndex}/${prompts.length} done.`,
            executionBatchDone: true
        }).catch(() => { });
    }
    else if (message.action === 'updateStatus') {
        chrome.storage.local.set({ statusText: message.text });
        chrome.runtime.sendMessage({ action: 'updateSidebar', statusText: message.text })
            .catch(() => { });
    }
    else if (message.action === 'updateFastHours') {
        chrome.storage.local.set({ fastHours: message.text });
        chrome.runtime.sendMessage({ action: 'updateFastHours', text: message.text })
            .catch(() => { });
    }
    else if (message.action === 'pauseScript' || message.action === 'resumeScript') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { action: message.action })
                    .catch(err => console.log('Message sending failed:', err));
            }
        });
    }
});

function executeNextBatch() {
    if (currentIndex >= prompts.length) {
        chrome.storage.local.set({ isExecuting: false, statusText: 'All prompts executed!' });
        chrome.runtime.sendMessage({ action: 'updateSidebar', statusText: 'All prompts executed!', executionBatchDone: true })
            .catch(() => { });
        return;
    }

    const batch = prompts.slice(currentIndex, currentIndex + BATCH_SIZE);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.runtime.sendMessage({ action: 'updateSidebar', statusText: `Executing batch ${currentIndex + 1} to ${currentIndex + batch.length}...` })
                .catch(() => { });
            chrome.tabs.sendMessage(tabs[0].id, { action: 'executeBatch', batch: batch })
                .catch(err => console.log('Message sending failed:', err));
            currentIndex += batch.length;
        }
    });
}
