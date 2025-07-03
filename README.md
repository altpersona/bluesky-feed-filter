# Bluesky Feed Filter - Firefox Extension

A Firefox extension that filters and removes unwanted content from Bluesky feeds based on keywords and phrases.

## Features

- **Real-time filtering**: Automatically hides posts containing blocked terms
- **Comprehensive text checking**: Filters based on post content, author names, handles, and hashtags
- **Right-click context menu**: Easily add selected text to your blocklist
- **Case-insensitive matching**: Blocks terms regardless of capitalization
- **Flexible management**: Add, remove, import, and export blocked terms
- **Temporary reveal**: Click on filtered post indicators to temporarily show hidden content
- **Easy toggle**: Enable/disable filtering with a simple switch

## Installation

### From Source (Developer Mode)

1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" in the sidebar
4. Click "Load Temporary Add-on"
5. Navigate to the extension directory and select the `manifest.json` file
6. The extension will be loaded and ready to use

### Icons

The extension requires icon files in the `icons/` directory:
- `icon-16.png` (16x16 pixels)
- `icon-32.png` (32x32 pixels)
- `icon-48.png` (48x48 pixels)
- `icon-128.png` (128x128 pixels)

You can create simple square icons with the text "BS" or a filter symbol.

## Usage

### Basic Usage

1. **Enable filtering**: Click the extension icon in the toolbar and toggle the "Enable filtering" switch
2. **Add terms**: Type words or phrases you want to filter in the popup and click "Add"
3. **Browse Bluesky**: Filtered posts will be hidden with a gray indicator
4. **Reveal posts**: Click on filter indicators to temporarily show hidden content

### Right-click Context Menu

1. Select any text on a Bluesky page
2. Right-click and choose "Add to Bluesky Filter"
3. The selected text will be added to your blocklist automatically

### Advanced Management

1. **Options page**: Right-click the extension icon and select "Options" for detailed management
2. **Bulk import**: Add multiple terms at once, one per line
3. **Export/Import**: Save your blocklist to a JSON file or import from a backup
4. **Clear all**: Remove all blocked terms at once

## How It Works

The extension works by:

1. **Monitoring the page**: Uses a MutationObserver to detect new posts as they load
2. **Text extraction**: Analyzes post content, author names, handles, and hashtags
3. **Pattern matching**: Compares extracted text against your blocklist (case-insensitive)
4. **Content hiding**: Hides matching posts and shows a filter indicator
5. **Real-time updates**: Applies filters immediately when new terms are added

## Filtered Content

The extension checks the following content:
- Post text content
- Author display names
- Author handles (@username)
- Hashtags (#tags)
- Quoted post content
- Mentioned users

## Privacy

- All data is stored locally in your browser
- No data is sent to external servers
- The extension only runs on Bluesky domains
- Blocklist data can be exported for backup

## File Structure

```
bluesky-feed-filter/
├── manifest.json          # Extension manifest
├── background.js          # Background script (context menu, storage)
├── content.js            # Content script (page filtering)
├── content.css           # Styles for filtered content
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── options.html          # Options page interface
├── options.js            # Options page functionality
├── icons/                # Extension icons
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   └── icon-128.png
└── README.md             # This file
```

## Troubleshooting

### Extension not working
- Ensure you're on `bsky.app` or a Bluesky domain
- Check that filtering is enabled in the extension popup
- Verify you have blocked terms in your list

### Posts not being filtered
- Check if the terms are correctly spelled
- Remember filtering is case-insensitive but looks for exact matches
- Try adding shorter, more specific terms

### Context menu not appearing
- Ensure you have text selected
- The context menu only appears when text is selected on Bluesky pages

## Contributing

Feel free to submit issues, feature requests, or pull requests. Some ideas for future enhancements:

- Regular expression support for advanced filtering
- Whitelist functionality for exceptions
- Statistics tracking (filtered posts count)
- Integration with Bluesky's native moderation tools
- Keyword highlighting instead of hiding

## License

This project is open source and available under the [MIT License](LICENSE).