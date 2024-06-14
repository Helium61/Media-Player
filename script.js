const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const albumArt = document.querySelector('.album-art');

let currentSongIndex = 0;
const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        src: "assets/songs/song1.mp3",
        albumArt: "assets/images/album1.jpg"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        src: "assets/songs/song2.mp3",
        albumArt: "assets/images/album2.jpg"
    },
    // Add more songs here
];

function loadSong(song) {
    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumArt.src = song.albumArt;
}

function playSong() {
    audioPlayer.play();
    playBtn.textContent = '⏸';
}

function pauseSong() {
    audioPlayer.pause();
    playBtn.textContent = '▶';
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

playBtn.addEventListener('click', () => {
    const isPlaying = audioPlayer.paused;
    if (isPlaying) {
        playSong();
    } else {
        pauseSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
});

progressBar.addEventListener('input', () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

volumeBar.addEventListener('input', () => {
    audioPlayer.volume = volumeBar.value / 100;
});

// Load the first song initially
loadSong(songs[currentSongIndex]);
