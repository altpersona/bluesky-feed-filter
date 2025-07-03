# Icon Creation Guide for Bluesky Feed Filter

## Required Icons

The extension needs these four icon files:
- `icon-16.png` (16x16 pixels)
- `icon-32.png` (32x32 pixels)
- `icon-48.png` (48x48 pixels)
- `icon-128.png` (128x128 pixels)

## Design Guidelines

### Visual Theme
- **Primary Color**: Blue (#1DA1F2 or #00A8E8 - representing Bluesky's brand)
- **Secondary Color**: White or light gray for contrast
- **Style**: Clean, modern, easily recognizable at small sizes

### Icon Concept Options

#### Option 1: Filter Symbol
- Funnel/filter shape (triangle with lines)
- Blue background with white filter icon
- Represents the filtering functionality

#### Option 2: Text-Based Icon
- "BS" letters (Bluesky) in clean font
- Blue background with white text
- Simple and effective

#### Option 3: Bird + Filter Combo
- Simple bird silhouette with filter lines
- Combines Bluesky (bird) with filter functionality

#### Option 4: Shield/Block Symbol
- Shield or block symbol
- Represents protection/blocking content
- Blue shield with white checkmark or X

## Creation Methods

### Method 1: Online Icon Generators

#### Favicon.io
1. Go to https://favicon.io/favicon-generator/
2. Enter text "BS" or use emoji "🐦"
3. Choose blue background (#1DA1F2)
4. Choose white text
5. Download all sizes

#### Canva
1. Go to https://canva.com
2. Search for "app icon" templates
3. Create 128x128 design
4. Use blue background
5. Add filter symbol or "BS" text
6. Download in PNG format
7. Resize for other dimensions

### Method 2: Simple Paint/Graphics Editor

#### Using Windows Paint
1. Create new image 128x128 pixels
2. Fill with blue color (#1DA1F2)
3. Add white text "BS" or simple filter shape
4. Save as PNG
5. Resize for other dimensions (16x16, 32x32, 48x48)

#### Using GIMP (Free)
1. Create new image 128x128 pixels
2. Fill background layer with blue
3. Add text layer with "BS" in white
4. Center the text
5. Export as PNG
6. Scale image to create other sizes

### Method 3: CSS-Generated Icons (Temporary)

Create HTML file with CSS to generate icon visually:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .icon {
            width: 128px;
            height: 128px;
            background: #1DA1F2;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 48px;
            font-weight: bold;
            color: white;
        }
    </style>
</head>
<body>
    <div class="icon">BS</div>
</body>
</html>
```

Then screenshot and crop to create icon files.

### Method 4: Unicode/Emoji Icons

Use emoji or Unicode symbols:
- 🐦 (bird)
- 🔒 (lock)
- 🚫 (no entry)
- ⚡ (lightning)
- 🛡️ (shield)

## Quick Implementation

### SVG to PNG Conversion
Create SVG first, then convert to PNG:

```svg
<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" fill="#1DA1F2" rx="8"/>
  <text x="64" y="80" text-anchor="middle" fill="white" font-family="Arial" font-size="48" font-weight="bold">BS</text>
</svg>
```

Use online SVG to PNG converters to create all sizes.

## Recommended Approach

1. **Start with 128x128**: Create the largest size first
2. **Use online tools**: Favicon.io is quickest for text-based icons
3. **Keep it simple**: Icons must be recognizable at 16x16 pixels
4. **Test visibility**: Ensure the icon is clear in browser toolbar

## Alternative: Use Default Icons Temporarily

The extension works without custom icons - Firefox will show a default puzzle piece icon. You can:
1. Launch the extension without icons
2. Add proper icons later
3. Update the repository when icons are ready

## Color Palette Suggestions

- **Primary Blue**: #1DA1F2 (Twitter blue)
- **Bluesky Blue**: #00A8E8
- **Dark Blue**: #0D47A1
- **White**: #FFFFFF
- **Light Gray**: #F5F5F5

## File Naming Convention

Ensure exact naming:
- `icon-16.png` (not `icon16.png`)
- `icon-32.png`
- `icon-48.png`
- `icon-128.png`

## Testing Icons

After creating icons:
1. Place them in the `icons/` directory
2. Reload the extension in Firefox
3. Check toolbar for proper icon display
4. Test different Firefox themes (dark/light)