# Floating Photography Gallery

A beautiful, interactive floating gallery for presenting photography sets with click sound effects.

## Features

- ✨ Floating animation effect on gallery items
- 🔊 Click sound when images are clicked
- 🎨 Modern, gradient background design
- 📱 Fully responsive design
- 🖼️ Lazy loading for better performance
- 🎭 Parallax effect on mouse movement

## Setup

1. **Replace Sample Images**: 
   - Open `script.js`
   - Replace the URLs in the `imageSets` object with your own photography URLs
   - You can organize images into sets or use a flat array

2. **Add Click Sound (Optional)**:
   - Add a `click-sound.mp3` or `click-sound.ogg` file to the project directory
   - If no audio file is provided, the gallery will automatically generate a synthetic click sound

3. **Open the Gallery**:
   - Simply open `index.html` in your web browser
   - Or use a local server for better performance:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```

## Customization

### Change Colors
Edit the gradient in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adjust Animation Speed
Modify the animation duration in `styles.css`:
```css
animation: float 6s ease-in-out infinite;
```

### Modify Sound
- Replace the audio file, or
- Adjust the sound parameters in the `generateClickSound()` function in `script.js`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Web Audio API support required for synthetic sounds
- Fallback to audio file if available

## License

Free to use and modify for your projects.

