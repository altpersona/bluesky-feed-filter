# Bluesky Feed Filter - Project Structure

## Overview
This Firefox extension filters Bluesky feed items based on blocked keywords and phrases, with right-click functionality to add selected text to the blocklist.

## File Structure

```
bluesky-feed-filter/
├── manifest.json              # Extension manifest and configuration
├── background.js              # Background script (context menu, storage, notifications)
├── content.js                 # Content script (page filtering, DOM manipulation)
├── content.css                # Styles for filtered content indicators
├── popup.html                 # Extension popup interface
├── popup.js                   # Popup functionality and blocklist management
├── options.html               # Options page interface
├── options.js                 # Options page functionality (bulk operations)
├── icons/                     # Extension icons directory
│   └── README.md              # Icon creation guide
├── README.md                  # Main documentation
├── INSTALL.md                 # Installation instructions
├── package.json               # NPM package configuration
└── PROJECT_STRUCTURE.md       # This file
```

## Component Overview

### Core Extension Files

- **manifest.json**: WebExtension manifest v2 with permissions and file declarations
- **background.js**: Handles context menu creation, storage operations, and notifications
- **content.js**: Monitors Bluesky pages, filters posts, and manages DOM manipulation
- **content.css**: Styles for filtered post indicators and transitions

### User Interface

- **popup.html/js**: Quick access interface for toggling and basic blocklist management
- **options.html/js**: Full-featured options page with bulk operations and import/export

### Documentation

- **README.md**: Complete user guide with features, installation, and usage
- **INSTALL.md**: Step-by-step installation instructions
- **PROJECT_STRUCTURE.md**: This technical overview

## Key Features Implemented

✅ **Real-time filtering**: MutationObserver watches for new posts
✅ **Comprehensive text checking**: Post content, author names, handles, hashtags
✅ **Right-click context menu**: Add selected text to blocklist
✅ **Case-insensitive matching**: Flexible term matching
✅ **Temporary reveal**: Click indicators to show filtered posts
✅ **Bulk operations**: Add multiple terms, import/export blocklist
✅ **Storage sync**: Settings persist across browser sessions
✅ **Notifications**: User feedback for blocklist changes

## Technical Details

### Permissions Required
- `activeTab`: Access to current tab for filtering
- `storage`: Save blocklist and settings
- `contextMenus`: Right-click functionality
- `notifications`: User feedback
- `https://bsky.app/*`: Access to Bluesky domains

### Storage Schema
```javascript
{
  blocklist: ["term1", "term2", ...],  // Array of blocked terms
  enabled: true|false                  // Filter enabled state
}
```

### Content Script Selectors
- `[data-testid="feedItem"]`: Individual posts
- `[data-testid="authorName"]`: Author display name
- `[data-testid="authorHandle"]`: Author handle
- `[data-testid="postText"]`: Post content
- `[data-testid="quotedPost"]`: Quoted post content

## Installation Requirements

1. Firefox browser (any recent version)
2. All extension files in same directory
3. Optional: Icon files in `icons/` directory
4. Load via `about:debugging` → "Load Temporary Add-on"

## Development Notes

- Uses WebExtension API (compatible with Firefox and Chrome)
- Manifest v2 format (can be upgraded to v3 if needed)
- No external dependencies
- Vanilla JavaScript (no frameworks)
- Responsive design for popup and options pages

## Future Enhancement Ideas

- Regular expression support for advanced filtering
- Whitelist functionality for exceptions
- Integration with Bluesky's native moderation
- Statistics tracking (filtered posts count)
- Keyword highlighting instead of hiding
- Export/import format compatibility with other tools
- Scheduled filtering (time-based rules)
- Custom filter categories/groups