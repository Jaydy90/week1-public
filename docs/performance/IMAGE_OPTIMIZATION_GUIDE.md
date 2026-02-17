# Image Optimization Guide for Trust Route

## Current Status
- **image.png**: 250 KB (UNUSED - can be deleted)
- **No images currently used in production**

---

## 🎯 Image Optimization Standards

### Size Targets
| Image Type | Max Size | Format | Use Case |
|------------|----------|--------|----------|
| Hero Image | 200 KB | WebP | Above-fold banners |
| Restaurant Photo | 100 KB | WebP | Card thumbnails |
| Icon/Logo | 10 KB | SVG or WebP | UI elements |
| Thumbnail | 50 KB | WebP | List items |

### Format Priority
1. **SVG** - For icons, logos, simple graphics
2. **WebP** - For photos (30% smaller than JPEG)
3. **AVIF** - Next-gen format (50% smaller, limited support)
4. **JPEG** - Fallback for photos
5. **PNG** - Only for transparency needs

---

## 🛠️ Optimization Tools

### Online Tools (No Installation)
1. **Squoosh** (Recommended)
   - URL: https://squoosh.app/
   - Features: WebP/AVIF conversion, quality comparison
   - How to use:
     1. Drag & drop image
     2. Select WebP format
     3. Adjust quality to 80-85%
     4. Download optimized file

2. **TinyPNG**
   - URL: https://tinypng.com/
   - Features: PNG/JPEG compression
   - Limitation: Max 5MB, 20 files/session

3. **Compressor.io**
   - URL: https://compressor.io/
   - Features: Lossy/lossless compression

### Command-Line Tools
```bash
# Install ImageMagick (already installed ✅)
brew install imagemagick

# Install WebP encoder
brew install webp

# Convert PNG to WebP
cwebp -q 80 input.png -o output.webp

# Batch convert
for img in *.png; do
  cwebp -q 80 "$img" -o "${img%.png}.webp"
done

# Compress JPEG
jpegoptim --max=85 --strip-all *.jpg

# Compress PNG
optipng -o5 *.png
```

---

## 📝 HTML Implementation

### Basic Image Tag (Lazy Loading)
```html
<img
  src="restaurant-photo.webp"
  alt="밍글스 대표 메뉴 - 멸치 국수와 전복"
  loading="lazy"
  width="400"
  height="300"
>
```

### Responsive Images (srcset)
```html
<img
  srcset="
    restaurant-photo-400w.webp 400w,
    restaurant-photo-800w.webp 800w,
    restaurant-photo-1200w.webp 1200w
  "
  sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
  src="restaurant-photo-800w.webp"
  alt="밍글스 대표 메뉴"
  loading="lazy"
  width="800"
  height="600"
>
```

### Modern Format with Fallback (picture)
```html
<picture>
  <source srcset="restaurant-photo.avif" type="image/avif">
  <source srcset="restaurant-photo.webp" type="image/webp">
  <img
    src="restaurant-photo.jpg"
    alt="밍글스 대표 메뉴"
    loading="lazy"
    width="800"
    height="600"
  >
</picture>
```

---

## 🚀 Performance Best Practices

### 1. Always Specify Dimensions
```html
<!-- ❌ BAD: Causes layout shift -->
<img src="photo.webp" alt="Restaurant">

<!-- ✅ GOOD: Prevents CLS -->
<img src="photo.webp" alt="Restaurant" width="400" height="300">
```

### 2. Use Lazy Loading
```html
<!-- Load images only when visible -->
<img src="photo.webp" loading="lazy" alt="Restaurant">
```

**Exception**: Don't lazy-load above-the-fold images (LCP elements)
```html
<!-- Hero image - load immediately -->
<img src="hero.webp" loading="eager" fetchpriority="high" alt="Hero">
```

### 3. Preload Critical Images
```html
<link rel="preload" as="image" href="hero.webp" type="image/webp">
```

### 4. Use CSS for Background Images
```css
.hero {
  background-image: url('hero.webp');
  background-size: cover;
}

/* High-DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .hero {
    background-image: url('hero@2x.webp');
  }
}
```

---

## 📊 Measurement & Validation

### Check Image Impact on Lighthouse
```bash
# Before adding images
Lighthouse Score: 95+

# After adding images (target)
Lighthouse Score: 95+
LCP: < 2.5s (ensure images don't inflate LCP)
```

### Verify Lazy Loading
1. Open Chrome DevTools
2. Network tab → Filter: Img
3. Scroll page → Images should load only when visible

### Verify Compression
```bash
# Check file size
ls -lh *.webp

# Should see 30-70% reduction vs original
# Example:
# restaurant.png: 500 KB
# restaurant.webp: 150 KB (-70%)
```

---

## 🎨 Restaurant Image Guidelines

### When Adding Restaurant Photos

1. **Source Images**
   - Use high-quality official photos (Naver Place, restaurant website)
   - Minimum resolution: 800x600px
   - Aspect ratio: 4:3 or 16:9

2. **Naming Convention**
   ```
   {restaurant-id}-{type}-{version}.webp

   Examples:
   rest-001-thumbnail.webp
   rest-001-hero.webp
   rest-001-menu-01.webp
   ```

3. **Storage Location**
   ```
   /images/
     restaurants/
       rest-001-thumbnail.webp
       rest-001-hero.webp
     ui/
       logo.svg
       icon-michelin.svg
   ```

4. **Optimization Workflow**
   ```bash
   # 1. Download original
   wget {image_url} -O original.jpg

   # 2. Resize if needed
   convert original.jpg -resize 800x600 resized.jpg

   # 3. Convert to WebP
   cwebp -q 80 resized.jpg -o rest-001-thumbnail.webp

   # 4. Verify size < 100KB
   ls -lh rest-001-thumbnail.webp
   ```

---

## ⚠️ Common Mistakes to Avoid

### 1. Not Setting Width/Height
```html
<!-- ❌ Causes layout shift -->
<img src="photo.webp">

<!-- ✅ Reserves space -->
<img src="photo.webp" width="400" height="300">
```

### 2. Lazy-Loading LCP Images
```html
<!-- ❌ Delays largest contentful paint -->
<img src="hero.webp" loading="lazy">

<!-- ✅ Load immediately -->
<img src="hero.webp" loading="eager" fetchpriority="high">
```

### 3. Using PNG for Photos
```html
<!-- ❌ Large file size -->
<img src="restaurant.png"> <!-- 500 KB -->

<!-- ✅ Optimized format -->
<img src="restaurant.webp"> <!-- 150 KB -->
```

### 4. Not Providing Alt Text
```html
<!-- ❌ Bad for SEO and accessibility -->
<img src="photo.webp">

<!-- ✅ Descriptive alt text -->
<img src="photo.webp" alt="밍글스 대표 메뉴 - 멸치 국수와 전복">
```

---

## 📋 Quick Action Checklist

### Before Adding Images
- [ ] Source high-quality photo (min 800x600)
- [ ] Convert to WebP format
- [ ] Compress to target size (< 100KB for thumbnails)
- [ ] Verify visual quality at 80% compression

### When Adding to HTML
- [ ] Set explicit width and height attributes
- [ ] Add descriptive alt text (Korean)
- [ ] Use loading="lazy" (except LCP images)
- [ ] Use consistent naming convention

### After Adding Images
- [ ] Run Lighthouse - ensure score stays 95+
- [ ] Check Network tab - verify lazy loading works
- [ ] Test on mobile - ensure images look good
- [ ] Verify CLS metric < 0.1 (no layout shift)

---

## 🔍 Current Action: Delete Unused Image

```bash
# Remove unused image.png (250 KB)
rm image.png

# This saves 250 KB and simplifies the project
```

---

## 📚 Resources

### Image Optimization Tools
- Squoosh: https://squoosh.app/
- TinyPNG: https://tinypng.com/
- ImageOptim: https://imageoptim.com/ (Mac)
- WebP Guide: https://developers.google.com/speed/webp

### Performance Guides
- Image Optimization: https://web.dev/fast/#optimize-your-images
- Lazy Loading: https://web.dev/browser-level-image-lazy-loading/
- Responsive Images: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

---

**Status**: ✅ Ready for implementation when images are needed

**Note**: Trust Route currently has no images in production, which is excellent for performance. Only add images when they provide clear user value.
