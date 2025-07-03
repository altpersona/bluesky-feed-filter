// Popup script for Bluesky Feed Filter
let blocklist = [];
let enabled = true;

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  setupEventListeners();
});

// Load settings from storage
function loadSettings() {
  browser.storage.sync.get(['blocklist', 'enabled'], (result) => {
    blocklist = result.blocklist || [];
    enabled = result.enabled !== false;
    
    // Update UI
    document.getElementById('enableFilter').checked = enabled;
    updateBlocklistDisplay();
    updateStats();
  });
}

// Setup event listeners
function setupEventListeners() {
  // Toggle filter
  document.getElementById('enableFilter').addEventListener('change', (e) => {
    enabled = e.target.checked;
    browser.storage.sync.set({ enabled }, () => {
      updateStats();
      notifyContentScripts();
    });
  });
  
  // Add term button
  document.getElementById('addBtn').addEventListener('click', addTerm);
  
  // Add term on Enter key
  document.getElementById('newTerm').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTerm();
    }
  });
}

// Add new term to blocklist
function addTerm() {
  const input = document.getElementById('newTerm');
  const term = input.value.trim();
  
  if (!term) {
    return;
  }
  
  // Check if term already exists (case-insensitive)
  const normalizedTerm = term.toLowerCase();
  if (blocklist.some(item => item.toLowerCase() === normalizedTerm)) {
    alert('This term is already in your filter list.');
    input.value = '';
    return;
  }
  
  // Add to blocklist
  blocklist.push(term);
  browser.storage.sync.set({ blocklist }, () => {
    updateBlocklistDisplay();
    updateStats();
    notifyContentScripts();
    input.value = '';
  });
}

// Remove term from blocklist
function removeTerm(index) {
  if (confirm('Remove this term from your filter?')) {
    blocklist.splice(index, 1);
    browser.storage.sync.set({ blocklist }, () => {
      updateBlocklistDisplay();
      updateStats();
      notifyContentScripts();
    });
  }
}

// Update blocklist display
function updateBlocklistDisplay() {
  const container = document.getElementById('blocklist');
  
  if (blocklist.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        No filtered terms yet. Add some words or phrases above, or right-click selected text on Bluesky to add it to the filter.
      </div>
    `;
    return;
  }
  
  container.innerHTML = blocklist.map((term, index) => `
    <div class="blocklist-item">
      <span title="${escapeHtml(term)}">${escapeHtml(term)}</span>
      <button class="remove-btn" onclick="removeTerm(${index})">Remove</button>
    </div>
  `).join('');
}

// Update stats display
function updateStats() {
  const stats = document.getElementById('stats');
  
  if (!enabled) {
    stats.textContent = 'Filter is disabled';
    return;
  }
  
  const termCount = blocklist.length;
  if (termCount === 0) {
    stats.textContent = 'Filter is enabled but no terms are blocked';
  } else {
    stats.textContent = `Filter is enabled - blocking ${termCount} term${termCount === 1 ? '' : 's'}`;
  }
}

// Notify content scripts of changes
function notifyContentScripts() {
  browser.tabs.query({ url: "*://bsky.app/*" }, (tabs) => {
    tabs.forEach(tab => {
      browser.tabs.sendMessage(tab.id, { 
        action: 'updateBlocklist', 
        blocklist,
        enabled 
      });
    });
  });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Make removeTerm available globally for onclick handlers
window.removeTerm = removeTerm;