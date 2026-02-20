document.addEventListener('DOMContentLoaded', () => {
    const keywordInput = document.getElementById('keyword');
    const extractBtn = document.getElementById('startExtractionBtn');
    const executeBtn = document.getElementById('startExecutionBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    const statusDiv = document.getElementById('status');
    const fastHoursDisplay = document.getElementById('fastHoursDisplay');
    const clearLogsBtn = document.getElementById('clearLogsBtn');
    const logWindow = document.getElementById('logWindow');

    function appendLog(message, type = 'info') {
        const div = document.createElement('div');
        div.className = `log-entry ${type}`;
        const time = new Date().toLocaleTimeString();
        div.textContent = `[${time}] ${message}`;
        logWindow.appendChild(div);
        logWindow.scrollTop = logWindow.scrollHeight;
    }

    // Load state from Chrome local storage
    chrome.storage.local.get(['keyword', 'prompts', 'statusText', 'isExtracting', 'isExecuting', 'logs', 'isPaused', 'fastHours'], (data) => {
        if (data.keyword) {
            keywordInput.value = data.keyword;
        }
        if (data.statusText) {
            statusDiv.textContent = data.statusText;
        }
        if (data.fastHours) {
            fastHoursDisplay.textContent = data.fastHours;
        }

        if (data.logs && Array.isArray(data.logs)) {
            logWindow.innerHTML = '';
            data.logs.forEach(log => appendLog(log.msg, log.type));
        }

        if (data.prompts && data.prompts.length > 0) {
            executeBtn.disabled = data.isExecuting || data.isExtracting;
            extractBtn.textContent = 'Extract Again';
        } else {
            executeBtn.disabled = true;
        }

        if (data.isExtracting || data.isExecuting) {
            if (data.isPaused) {
                pauseBtn.disabled = true;
                resumeBtn.disabled = false;
                statusDiv.textContent = 'PAUSED: ' + (data.statusText || '');
            } else {
                pauseBtn.disabled = false;
                resumeBtn.disabled = true;
            }
        } else {
            pauseBtn.disabled = true;
            resumeBtn.disabled = true;
        }

        if (data.isExtracting) extractBtn.disabled = true;
        if (data.isExecuting) executeBtn.disabled = true;

        // Failsafe: If the extension was killed mid-run, the buttons get permanently locked.
        // We add an event listener to the keyword input so the user can just type to unlock it.
        keywordInput.addEventListener('input', () => {
            if (extractBtn.disabled) {
                chrome.storage.local.set({ isExtracting: false, isExecuting: false });
                extractBtn.disabled = false;
                pauseBtn.disabled = true;
                resumeBtn.disabled = true;
            }
        });
    });

    extractBtn.addEventListener('click', () => {
        const keyword = keywordInput.value.trim();
        if (!keyword) {
            appendLog('Please enter a keyword first.', 'error');
            return;
        }

        chrome.storage.local.set({ keyword: keyword, statusText: 'Starting extraction...', logs: [], isPaused: false });
        statusDiv.textContent = 'Starting extraction...';
        logWindow.innerHTML = '';
        appendLog(`Starting extraction for keyword: "${keyword}"`, 'info');
        extractBtn.disabled = true;
        pauseBtn.disabled = false;
        resumeBtn.disabled = true;

        chrome.runtime.sendMessage({ action: 'startExtraction', keyword: keyword });
    });

    executeBtn.addEventListener('click', () => {
        chrome.storage.local.set({ statusText: 'Starting execution batch...', isPaused: false });
        statusDiv.textContent = 'Starting execution batch...';
        appendLog('Starting execution batch...', 'info');
        executeBtn.disabled = true;
        pauseBtn.disabled = false;
        resumeBtn.disabled = true;

        chrome.runtime.sendMessage({ action: 'startExecution' });
    });

    pauseBtn.addEventListener('click', () => {
        chrome.storage.local.set({ isPaused: true });
        appendLog('Instructing script to pause...', 'error'); // using error color for visibility
        pauseBtn.disabled = true;
        resumeBtn.disabled = false;

        chrome.runtime.sendMessage({ action: 'pauseScript' });
    });

    resumeBtn.addEventListener('click', () => {
        chrome.storage.local.set({ isPaused: false });
        appendLog('Resuming script...', 'success');
        pauseBtn.disabled = false;
        resumeBtn.disabled = true;

        chrome.runtime.sendMessage({ action: 'resumeScript' });
    });

    clearLogsBtn.addEventListener('click', () => {
        logWindow.innerHTML = '';
        chrome.storage.local.set({ logs: [] });
    });

    // Listen for real-time updates from background worker
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'updateSidebar') {
            if (message.statusText) {
                statusDiv.textContent = message.statusText;
            }
            if (message.extractionDone) {
                extractBtn.disabled = false;
                pauseBtn.disabled = true;
                resumeBtn.disabled = true;

                chrome.storage.local.get(['prompts'], (data) => {
                    if (data.prompts && data.prompts.length > 0) executeBtn.disabled = false;
                });
            }
            if (message.executionBatchDone) {
                executeBtn.disabled = false;
                pauseBtn.disabled = true;
                resumeBtn.disabled = true;
            }
        } else if (message.action === 'updateFastHours') {
            fastHoursDisplay.textContent = message.text;
        } else if (message.action === 'log') {
            appendLog(message.msg, message.type);

            chrome.storage.local.get(['logs'], (data) => {
                const logs = data.logs || [];
                logs.push({ msg: message.msg, type: message.type });
                // Keep last 100 logs
                if (logs.length > 100) logs.shift();
                chrome.storage.local.set({ logs: logs });
            });
        }
    });
});
