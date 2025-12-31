# Public Assets Folder

This folder contains static assets like images that can be accessed directly.

## Adding the BAZENI KAUKOVIĆ Image

1. Save your image file in this `public` folder
2. Name it: `bazeni-kaukovic.jpg` (or `.png` if it's a PNG file)
3. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

### Image Requirements:
- Recommended size: 800x400px or similar aspect ratio
- File size: Keep it under 500KB for best performance
- Format: JPG or PNG

### If you use a different filename:
If your image has a different name, update the `image` property in `components/BentoGrid.tsx`:
```typescript
image: "/your-image-name.jpg", // Change this to match your file
```

## How it works:
- Files in the `public` folder are served from the root URL
- Example: `public/bazeni-kaukovic.jpg` → accessible at `/bazeni-kaukovic.jpg`
- The Next.js Image component will automatically optimize the image



This folder contains static assets like images that can be accessed directly.

## Adding the BAZENI KAUKOVIĆ Image

1. Save your image file in this `public` folder
2. Name it: `bazeni-kaukovic.jpg` (or `.png` if it's a PNG file)
3. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

### Image Requirements:
- Recommended size: 800x400px or similar aspect ratio
- File size: Keep it under 500KB for best performance
- Format: JPG or PNG

### If you use a different filename:
If your image has a different name, update the `image` property in `components/BentoGrid.tsx`:
```typescript
image: "/your-image-name.jpg", // Change this to match your file
```

## How it works:
- Files in the `public` folder are served from the root URL
- Example: `public/bazeni-kaukovic.jpg` → accessible at `/bazeni-kaukovic.jpg`
- The Next.js Image component will automatically optimize the image


