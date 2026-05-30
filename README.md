# Modern Music Player 🎵

A beautiful, responsive music player with glassmorphism dark theme and smooth animations.

## Features ✨

- ✅ Play/Pause functionality
- ✅ Next/Previous song navigation
- ✅ Dynamic song title and artist display
- ✅ Song duration and current time tracking
- ✅ Interactive progress bar with seek functionality
- ✅ Volume control slider
- ✅ Playlist sidebar with clickable songs
- ✅ Autoplay next song when current ends
- ✅ Fully responsive mobile-friendly design
- ✅ Glassmorphism dark theme with animated background
- ✅ Smooth animations and transitions
- ✅ Keyboard shortcuts (Space, Arrow Left/Right)

## Usage 🚀

1. Open `index.html` in your web browser
2. Click play to start listening
3. Use the controls to navigate between songs
4. Adjust volume with the slider
5. Click any song in the playlist to play it

## Customization 🎨

### Adding Your Own Music

Edit the `playlist` array in `script.js`:

```javascript
const playlist = [
    {
        title: "Your Song Title",
        artist: "Artist Name",
        cover: "path/to/album-cover.jpg",
        audio: "path/to/song.mp3",
        duration: "3:45"
    },
    // Add more songs...
];
```

### File Structure

```
music-player/
├── index.html      # HTML structure
├── style.css       # Styling and animations
├── script.js       # Music player functionality
└── README.md       # Documentation
```

### Using Local Files

1. Create a folder structure like this:
   ```
   music-player/
   ├── index.html
   ├── style.css
   ├── script.js
   ├── audio/
   │   ├── song1.mp3
   │   ├── song2.mp3
   │   └── ...
   └── images/
       ├── cover1.jpg
       ├── cover2.jpg
       └── ...
   ```

2. Update the paths in `script.js`:
   ```javascript
   cover: "images/cover1.jpg",
   audio: "audio/song1.mp3",
   ```

## Keyboard Shortcuts ⌨️

- `Space` - Play/Pause
- `Arrow Right` - Next Song
- `Arrow Left` - Previous Song

## Browser Compatibility 🌐

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Credits 💡

- Icons: Font Awesome
- Fonts: Poppins (Google Fonts)
- Sample Images: Unsplash
- Sample Audio: SoundHelix (royalty-free music)

## License 📄

Free to use for personal and commercial projects.

---

Enjoy your music! 🎧
