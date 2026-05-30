
const playlist = [
    {
        title: "Midnight Dreams",
        artist: "Luna Eclipse",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: "3:45"
    },
    {
        title: "Neon Lights",
        artist: "Cyber Wave",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duration: "4:12"
    },
    {
        title: "Ocean Breeze",
        artist: "Coastal Vibes",
        cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=500&fit=crop",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        duration: "3:58"
    },
    {
        title: "Electric Soul",
        artist: "Rhythm Nation",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        duration: "4:30"
    },
    {
        title: "Starlight Serenade",
        artist: "Nova Dreams",
        cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=500&fit=crop",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        duration: "3:22"
    }
];

// DOM ELEMENTS

const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.querySelector('.progress-bar');
const progress = document.getElementById('progress');
const progressDot = document.getElementById('progress-dot');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const albumArt = document.getElementById('album-art');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const volumeSlider = document.getElementById('volume-slider');
const volumePercentage = document.getElementById('volume-percentage');
const playlistContainer = document.getElementById('playlist');
const playingAnimation = document.querySelector('.playing-animation');
const searchInput = document.getElementById('search-input');

// PLAYER STATE

let currentSongIndex = 0;
let isPlaying = false;


// INITIALIZE PLAYER

function init() {
    loadSong(currentSongIndex);
    renderPlaylist();
    setVolume(70);
}


//  LOAD SONG

function loadSong(index) {
    const song = playlist[index];

    audioPlayer.src = song.audio;
    albumArt.src = song.cover;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;

    // Update active playlist item
    updatePlaylistUI();
}


// PLAY / PAUSE

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    isPlaying = true;
    audioPlayer.play();
    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause');
    playingAnimation.classList.add('active');
}

function pauseSong() {
    isPlaying = false;
    audioPlayer.pause();
    playBtn.querySelector('i').classList.remove('fa-pause');
    playBtn.querySelector('i').classList.add('fa-play');
    playingAnimation.classList.remove('active');
}

// NEXT / PREVIOUS

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= playlist.length) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = playlist.length - 1;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

// UPDATE PROGRESS BAR

function updateProgress() {
    const { currentTime, duration } = audioPlayer;

    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        progressDot.style.left = `${progressPercent}%`;

        currentTimeEl.textContent = formatTime(currentTime);
        totalTimeEl.textContent = formatTime(duration);
    }
}

// SEEK SONG

function seekSong(e) {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;

    audioPlayer.currentTime = (clickX / width) * duration;
}

// VOLUME CONTROL

function setVolume(value) {
    audioPlayer.volume = value / 100;
    volumeSlider.value = value;
    volumePercentage.textContent = `${value}%`;
}

function updateVolume() {
    const value = volumeSlider.value;
    setVolume(value);
}

//  FORMAT TIME

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

//  RENDER PLAYLIST

function renderPlaylist() {
    playlistContainer.innerHTML = '';

    playlist.forEach((song, index) => {
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist-item');
        if (index === currentSongIndex) {
            playlistItem.classList.add('active');
        }

        playlistItem.innerHTML = `
            <img src="${song.cover}" alt="${song.title}">
            <div class="playlist-item-info">
                <div class="playlist-item-title">${song.title}</div>
                <div class="playlist-item-artist">${song.artist}</div>
            </div>
            <div class="playlist-item-duration">${song.duration}</div>
        `;

        playlistItem.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(index);
            playSong();
        });

        playlistContainer.appendChild(playlistItem);
    });
}

//  UPDATE PLAYLIST UI

function updatePlaylistUI() {
    const playlistItems = document.querySelectorAll('.playlist-item');
    playlistItems.forEach((item, index) => {
        if (index === currentSongIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// AUTOPLAY NEXT SONG

audioPlayer.addEventListener('ended', () => {
    nextSong();
    playSong();
});


// EVENT LISTENERS

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audioPlayer.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', seekSong);
volumeSlider.addEventListener('input', updateVolume);

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    playlist.forEach((song, index) => {
        const title = song.title.toLowerCase();
        const artist = song.artist.toLowerCase();
        
        if (title.includes(searchTerm) || artist.includes(searchTerm)) {
            playlistItems[index].style.display = 'flex';
        } else {
            playlistItems[index].style.display = 'none';
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'Space':
            e.preventDefault();
            togglePlay();
            break;
        case 'ArrowRight':
            nextSong();
            break;
        case 'ArrowLeft':
            prevSong();
            break;
    }
});


// INITIALIZE ON PAGE LOAD

window.addEventListener('DOMContentLoaded', init);
