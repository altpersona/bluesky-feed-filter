// Content script for Bluesky Feed Filter
let blocklist = [];
let enabled = true;
let observer = null;

// Initialize the filter
init();

function init() {
  // Get initial blocklist from storage
  browser.runtime.sendMessage({ action: 'getBlocklist' }, (response) => {
    if (response) {
      blocklist = response.blocklist || [];
      enabled = response.enabled !== false;
      
      if (enabled) {
        startFiltering();
      }
    }
  });
}

// Listen for messages from background script
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateBlocklist') {
    blocklist = request.blocklist;
    filterExistingPosts();
  }
});

// Start filtering posts
function startFiltering() {
  // Filter existing posts
  filterExistingPosts();
  
  // Watch for new posts
  observeForNewPosts();
}

// Filter existing posts on the page
function filterExistingPosts() {
  const posts = document.querySelectorAll('[data-testid="feedItem"]');
  posts.forEach(post => filterPost(post));
}

// Set up mutation observer to watch for new posts
function observeForNewPosts() {
  if (observer) {
    observer.disconnect();
  }
  
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Check if the added node is a post
          if (node.getAttribute && node.getAttribute('data-testid') === 'feedItem') {
            filterPost(node);
          }
          
          // Check if the added node contains posts
          const posts = node.querySelectorAll && node.querySelectorAll('[data-testid="feedItem"]');
          if (posts) {
            posts.forEach(post => filterPost(post));
          }
        }
      });
    });
  });
  
  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Filter individual post
function filterPost(postElement) {
  if (!postElement || !enabled || blocklist.length === 0) {
    return;
  }
  
  // Extract text content from various parts of the post
  const textContent = extractPostText(postElement);
  
  // Check if any blocked terms are found
  const shouldBlock = blocklist.some(term => 
    textContent.toLowerCase().includes(term.toLowerCase())
  );
  
  if (shouldBlock) {
    hidePost(postElement);
  }
}

// Extract text content from post including author name, handle, and content
function extractPostText(postElement) {
  let textContent = '';
  
  // Get author display name
  const authorName = postElement.querySelector('[data-testid="authorName"]');
  if (authorName) {
    textContent += authorName.textContent + ' ';
  }
  
  // Get author handle
  const authorHandle = postElement.querySelector('[data-testid="authorHandle"]');
  if (authorHandle) {
    textContent += authorHandle.textContent + ' ';
  }
  
  // Get post content
  const postContent = postElement.querySelector('[data-testid="postText"]');
  if (postContent) {
    textContent += postContent.textContent + ' ';
  }
  
  // Get hashtags and mentions
  const links = postElement.querySelectorAll('a[href*="/hashtag/"], a[href*="/profile/"]');
  links.forEach(link => {
    textContent += link.textContent + ' ';
  });
  
  // Get quoted post content if exists
  const quotedPost = postElement.querySelector('[data-testid="quotedPost"]');
  if (quotedPost) {
    textContent += extractPostText(quotedPost);
  }
  
  return textContent.trim();
}

// Hide filtered post
function hidePost(postElement) {
  postElement.style.display = 'none';
  
  // Add a filtered indicator (optional)
  const indicator = document.createElement('div');
  indicator.className = 'bluesky-filter-indicator';
  indicator.innerHTML = `
    <div style="
      padding: 10px;
      margin: 5px 0;
      background-color: #f0f0f0;
      border-left: 4px solid #ccc;
      font-size: 14px;
      color: #666;
      cursor: pointer;
    ">
      📝 Post filtered by Bluesky Feed Filter (click to show)
    </div>
  `;
  
  indicator.addEventListener('click', () => {
    postElement.style.display = '';
    indicator.remove();
  });
  
  postElement.parentNode.insertBefore(indicator, postElement);
}

// Clean up when page unloads
window.addEventListener('beforeunload', () => {
  if (observer) {
    observer.disconnect();
  }
});