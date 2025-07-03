// Background script for Bluesky Feed Filter
const DEFAULT_BLOCKLIST = [];

// Initialize extension
browser.runtime.onInstalled.addListener(() => {
  // Initialize storage with default values
  browser.storage.sync.get(['blocklist', 'enabled'], (result) => {
    if (!result.blocklist) {
      browser.storage.sync.set({ blocklist: DEFAULT_BLOCKLIST });
    }
    if (result.enabled === undefined) {
      browser.storage.sync.set({ enabled: true });
    }
  });
  
  // Create context menu
  createContextMenu();
});

// Create context menu for adding selected text to blocklist
function createContextMenu() {
  browser.contextMenus.create({
    id: "addToBlocklist",
    title: "Add to Bluesky Filter",
    contexts: ["selection"]
  });
}

// Handle context menu clicks
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addToBlocklist" && info.selectionText) {
    addToBlocklist(info.selectionText.trim());
  }
});

// Add term to blocklist
function addToBlocklist(term) {
  if (!term || term.length === 0) return;
  
  browser.storage.sync.get(['blocklist'], (result) => {
    const blocklist = result.blocklist || [];
    const normalizedTerm = term.toLowerCase();
    
    // Check if term already exists
    if (!blocklist.some(item => item.toLowerCase() === normalizedTerm)) {
      blocklist.push(term);
      browser.storage.sync.set({ blocklist }, () => {
        // Notify content script to update filters
        browser.tabs.query({ url: "*://bsky.app/*" }, (tabs) => {
          tabs.forEach(tab => {
            browser.tabs.sendMessage(tab.id, { 
              action: 'updateBlocklist', 
              blocklist 
            });
          });
        });
        
        // Show notification
        browser.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon-48.png',
          title: 'Bluesky Feed Filter',
          message: `Added "${term}" to filter list`
        });
      });
    }
  });
}

// Handle messages from content script
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getBlocklist') {
    browser.storage.sync.get(['blocklist', 'enabled'], (result) => {
      sendResponse({
        blocklist: result.blocklist || [],
        enabled: result.enabled !== false
      });
    });
    return true; // Keep message channel open for async response
  }
});