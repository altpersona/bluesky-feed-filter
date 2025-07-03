// Options script for Bluesky Feed Filter
let blocklist = [];
let enabled = true;

// Initialize options page
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
  });
}

// Setup event listeners
function setupEventListeners() {
  // Toggle filter
  document.getElementById('enableFilter').addEventListener('change', (e) => {
    enabled = e.target.checked;
    browser.storage.sync.set({ enabled }, () => {
      showStatusMessage('Settings saved successfully!', 'success');
      notifyContentScripts();
    });
  });
  
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
    showStatusMessage('Please enter a term to block.', 'error');
    return;
  }
  
  // Check if term already exists (case-insensitive)
  const normalizedTerm = term.toLowerCase();
  if (blocklist.some(item => item.toLowerCase() === normalizedTerm)) {
    showStatusMessage('This term is already in your filter list.', 'error');
    input.value = '';
    return;
  }
  
  // Add to blocklist
  blocklist.push(term);
  browser.storage.sync.set({ blocklist }, () => {
    updateBlocklistDisplay();
    notifyContentScripts();
    input.value = '';
    showStatusMessage(`Added "${term}" to blocklist.`, 'success');
  });
}

// Bulk add terms
function bulkAddTerms() {
  const textarea = document.getElementById('bulkTerms');
  const terms = textarea.value.split('\n')
    .map(term => term.trim())
    .filter(term => term.length > 0);
  
  if (terms.length === 0) {
    showStatusMessage('Please enter at least one term.', 'error');
    return;
  }
  
  let addedCount = 0;
  let skippedCount = 0;
  
  terms.forEach(term => {
    const normalizedTerm = term.toLowerCase();
    if (!blocklist.some(item => item.toLowerCase() === normalizedTerm)) {
      blocklist.push(term);
      addedCount++;
    } else {
      skippedCount++;
    }
  });
  
  if (addedCount > 0) {
    browser.storage.sync.set({ blocklist }, () => {
      updateBlocklistDisplay();
      notifyContentScripts();
      textarea.value = '';
      
      let message = `Added ${addedCount} term${addedCount === 1 ? '' : 's'} to blocklist.`;
      if (skippedCount > 0) {
        message += ` Skipped ${skippedCount} duplicate${skippedCount === 1 ? '' : 's'}.`;
      }
      showStatusMessage(message, 'success');
    });
  } else {
    showStatusMessage('All terms were already in your blocklist.', 'error');
  }
}

// Remove term from blocklist
function removeTerm(index) {
  if (confirm('Remove this term from your filter?')) {
    const removedTerm = blocklist[index];
    blocklist.splice(index, 1);
    browser.storage.sync.set({ blocklist }, () => {
      updateBlocklistDisplay();
      notifyContentScripts();
      showStatusMessage(`Removed "${removedTerm}" from blocklist.`, 'success');
    });
  }
}

// Update blocklist display
function updateBlocklistDisplay() {
  const container = document.getElementById('blocklistManager');
  
  if (blocklist.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: #666; padding: 20px;">
        No blocked terms yet.
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

// Export blocklist to JSON file
function exportBlocklist() {
  if (blocklist.length === 0) {
    showStatusMessage('No terms to export.', 'error');
    return;
  }
  
  const data = {
    version: '1.0.0',
    exported: new Date().toISOString(),
    blocklist: blocklist
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `bluesky-filter-blocklist-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showStatusMessage('Blocklist exported successfully!', 'success');
}

// Import blocklist from JSON file
function importBlocklist() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (!Array.isArray(data.blocklist)) {
          throw new Error('Invalid file format');
        }
        
        let addedCount = 0;
        let skippedCount = 0;
        
        data.blocklist.forEach(term => {
          if (typeof term === 'string' && term.trim()) {
            const normalizedTerm = term.toLowerCase();
            if (!blocklist.some(item => item.toLowerCase() === normalizedTerm)) {
              blocklist.push(term.trim());
              addedCount++;
            } else {
              skippedCount++;
            }
          }
        });
        
        if (addedCount > 0) {
          browser.storage.sync.set({ blocklist }, () => {
            updateBlocklistDisplay();
            notifyContentScripts();
            
            let message = `Imported ${addedCount} term${addedCount === 1 ? '' : 's'}.`;
            if (skippedCount > 0) {
              message += ` Skipped ${skippedCount} duplicate${skippedCount === 1 ? '' : 's'}.`;
            }
            showStatusMessage(message, 'success');
          });
        } else {
          showStatusMessage('No new terms to import.', 'error');
        }
      } catch (error) {
        showStatusMessage('Error importing file. Please check the file format.', 'error');
      }
    };
    reader.readAsText(file);
  };
  
  input.click();
}

// Clear all blocked terms
function clearBlocklist() {
  if (blocklist.length === 0) {
    showStatusMessage('Blocklist is already empty.', 'error');
    return;
  }
  
  if (confirm(`Are you sure you want to remove all ${blocklist.length} blocked terms? This action cannot be undone.`)) {
    blocklist = [];
    browser.storage.sync.set({ blocklist }, () => {
      updateBlocklistDisplay();
      notifyContentScripts();
      showStatusMessage('All blocked terms have been cleared.', 'success');
    });
  }
}

// Show status message
function showStatusMessage(message, type) {
  const statusDiv = document.getElementById('statusMessage');
  statusDiv.textContent = message;
  statusDiv.className = `status-message ${type}`;
  statusDiv.style.display = 'block';
  
  setTimeout(() => {
    statusDiv.style.display = 'none';
  }, 5000);
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

// Make functions available globally for onclick handlers
window.addTerm = addTerm;
window.bulkAddTerms = bulkAddTerms;
window.removeTerm = removeTerm;
window.exportBlocklist = exportBlocklist;
window.importBlocklist = importBlocklist;
window.clearBlocklist = clearBlocklist;