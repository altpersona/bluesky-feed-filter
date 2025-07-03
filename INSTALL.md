# Installation Instructions

## Quick Setup

1. **Download the extension files** to a folder on your computer
2. **Create icons** (optional - see `icons/README.md` for guidance)
3. **Load in Firefox** following the steps below

## Detailed Installation Steps

### Step 1: Prepare the Extension

1. Ensure all files are in the same directory:
   - `manifest.json`
   - `background.js`
   - `content.js`
   - `content.css`
   - `popup.html`
   - `popup.js`
   - `options.html`
   - `options.js`
   - `icons/` directory (with icon files if available)

### Step 2: Load in Firefox

1. Open Firefox
2. Type `about:debugging` in the address bar and press Enter
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on" button
5. Navigate to your extension directory
6. Select the `manifest.json` file
7. Click "Open"

### Step 3: Verify Installation

1. You should see the extension listed in the "Temporary Extensions" section
2. Look for the extension icon in the Firefox toolbar
3. Click the icon to open the popup and verify it works

### Step 4: Start Using

1. Navigate to `bsky.app` or any Bluesky domain
2. Click the extension icon in the toolbar
3. Toggle "Enable filtering" to ON
4. Add some test terms to your blocklist
5. Browse your Bluesky feed to see filtering in action

## Quick Test

To quickly test if the extension is working:

1. Go to Bluesky and find a post with common words
2. Add one of those words to your blocklist
3. Refresh the page - the post should be hidden
4. Click the filter indicator to reveal the hidden post

## Troubleshooting

### Extension not loading
- Make sure you selected the `manifest.json` file
- Check that all required files are in the same directory
- Look for error messages in the debugging panel

### Not working on Bluesky
- Ensure you're on `bsky.app` or a Bluesky domain
- Check that filtering is enabled in the extension popup
- Make sure you have at least one term in your blocklist

### Icons not showing
- This is normal if you haven't created icon files
- Firefox will show a default extension icon
- The extension will work perfectly without custom icons

## Development Mode

When loaded as a temporary add-on, the extension will:
- Be removed when Firefox closes
- Need to be reloaded after code changes
- Show in the debugging panel for troubleshooting

## Converting to Permanent Installation

For permanent installation, you would need to:
1. Package the extension as a .xpi file
2. Sign it with Mozilla (for distribution)
3. Install it permanently

For personal use, temporary installation is sufficient.