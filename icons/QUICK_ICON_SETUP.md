# Quick Icon Setup for Bluesky Feed Filter

## Immediate Solution (30 seconds)

### Method 1: Use the HTML Generator
1. Open `icons/icon-generator.html` in your browser
2. Right-click on each icon and "Save image as..."
3. Save with exact names: `icon-16.png`, `icon-32.png`, `icon-48.png`, `icon-128.png`
4. Place files in the `icons/` directory
5. Reload extension in Firefox

### Method 2: Online Generator (Fastest)
1. Go to https://favicon.io/favicon-generator/
2. Enter text: "BS" (for BlueSky)
3. Background Color: #1DA1F2 (blue)
4. Font Color: #FFFFFF (white)
5. Font: Arial
6. Download the package
7. Extract and rename files to match our naming convention

### Method 3: Use SVG Template
1. Open `icons/icon-template.svg` in a browser
2. Right-click and "Save image as..." or take screenshot
3. Use online SVG to PNG converter
4. Generate all 4 sizes (16x16, 32x32, 48x48, 128x128)

## File Requirements

The extension needs exactly these files:
```
icons/
├── icon-16.png   (16x16 pixels)
├── icon-32.png   (32x32 pixels)
├── icon-48.png   (48x48 pixels)
└── icon-128.png  (128x128 pixels)
```

## Verification Steps

After creating icons:
1. Check that all 4 files are in the `icons/` directory
2. Verify file names match exactly (case-sensitive)
3. Reload the extension in Firefox (`about:debugging`)
4. Look for the new icon in the Firefox toolbar

## Troubleshooting

**Icons not showing:**
- Check file names (must be exact: `icon-16.png` not `icon16.png`)
- Verify files are PNG format
- Ensure files are in the correct `icons/` directory
- Try reloading the extension

**Icons look blurry:**
- Make sure each icon is created at its target size
- Don't just resize one large icon for all sizes
- Use crisp, high-contrast designs

## Design Tips

**For 16x16 icons (smallest):**
- Keep design very simple
- Use high contrast colors
- Avoid fine details
- Test how it looks in Firefox toolbar

**Colors that work well:**
- Background: #1DA1F2 (Twitter blue)
- Text/Symbol: #FFFFFF (white)
- Alternative: #00A8E8 (Bluesky blue)

**Symbol suggestions:**
- "BS" text (BlueSky)
- Filter/funnel symbol
- Bird emoji 🐦
- Shield symbol 🛡️

## Without Icons

The extension works perfectly without custom icons. Firefox will show a default puzzle piece icon. You can:
1. Use the extension immediately
2. Add proper icons later
3. Update the GitHub repo when ready

This is completely normal for development!