/* =========================================================
   TASK 4: MUSIC PLAYER
   Place your own audio files inside a "songs/" folder next
   to this script, named exactly as the "src" values below
   (e.g. songs/bw1.mp3). Until real files are added, the
   player still works fully in the UI (progress bar, volume,
   playlist switching, next/prev, repeat, shuffle) but audio
   playback needs a real file for each track.
   ========================================================= */

/* ---------- PLAYLIST DATA ----------
   NOTE ON AUDIO: Actual copyrighted Bollywood/English tracks can't be
   embedded here. The "src" values below point to free, openly-licensed
   demo audio (SoundHelix) so the player is fully functional out of the
   box for your demo/viva. To use the REAL songs, just replace each src
   with a local file path (e.g. "songs/bw1.mp3") once you add your own
   mp3 files to a songs/ folder next to this script — everything else
   (titles, artists, UI) is already set up for the tracks named below.
------------------------------------------------------------------- */
const bollywoodSongs = [
  { title: "Kesariya",              artist: "Arijit Singh",              duration: "4:28", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",  color: "#ff6a88" },
  { title: "Tum Hi Ho",             artist: "Arijit Singh",              duration: "4:22", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",  color: "#6a82fb" },
  { title: "Zinda",                 artist: "Siddharth Mahadevan",       duration: "5:22", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",  color: "#ff9a5a" },
  { title: "Channa Mereya",         artist: "Arijit Singh",              duration: "4:50", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",  color: "#43cea2" },
  { title: "Kal Ho Naa Ho",         artist: "Sonu Nigam",                duration: "5:32", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",  color: "#f7797d" },
  { title: "Raabta",                artist: "Arijit Singh",              duration: "3:52", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",  color: "#a18cd1" },
  { title: "Tera Yaar Hoon Main",   artist: "Arijit Singh, Amit Mishra", duration: "4:44", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",  color: "#ff758c" },
  { title: "Apna Bana Le",          artist: "Arijit Singh",              duration: "3:39", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",  color: "#f6d365" },
  { title: "Agar Tum Saath Ho",     artist: "Alka Yagnik, Arijit Singh", duration: "5:41", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",  color: "#5ee7df" },
  { title: "Ilahi",                 artist: "Arijit Singh",              duration: "4:18", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", color: "#fbc2eb" }
];

const englishSongs = [
  { title: "Blinding Lights",       artist: "The Weeknd",     duration: "3:20", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", color: "#ff6a88" },
  { title: "Shape of You",          artist: "Ed Sheeran",     duration: "3:53", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", color: "#6a82fb" },
  { title: "Someone Like You",      artist: "Adele",          duration: "4:45", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", color: "#ff9a5a" },
  { title: "Perfect",               artist: "Ed Sheeran",     duration: "4:23", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", color: "#43cea2" },
  { title: "Levitating",            artist: "Dua Lipa",       duration: "3:23", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", color: "#f7797d" },
  { title: "Stay",                  artist: "The Kid LAROI, Justin Bieber", duration: "2:21", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", color: "#a18cd1" },
  { title: "Cruel Summer",          artist: "Taylor Swift",   duration: "2:58", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",  color: "#ff758c" },
  { title: "Counting Stars",        artist: "OneRepublic",    duration: "4:17", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",  color: "#f6d365" },
  { title: "Uptown Funk",           artist: "Mark Ronson ft. Bruno Mars", duration: "4:30", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", color: "#5ee7df" },
  { title: "Someone You Loved",     artist: "Lewis Capaldi",  duration: "3:02", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",  color: "#fbc2eb" }
];

const libraries = { bollywood: bollywoodSongs, english: englishSongs };

/* ---------- STATE ---------- */
let currentList = "bollywood";
let currentIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 0; // 0 = off, 1 = repeat all, 2 = repeat one

/* ---------- DOM REFS ---------- */
const audio          = document.getElementById("audio");
const playBtn        = document.getElementById("play-btn");
const prevBtn        = document.getElementById("prev-btn");
const nextBtn        = document.getElementById("next-btn");
const shuffleBtn     = document.getElementById("shuffle-btn");
const repeatBtn      = document.getElementById("repeat-btn");
const progressBar    = document.getElementById("progress-bar");
const currentTimeEl  = document.getElementById("current-time");
const durationEl     = document.getElementById("duration");
const volumeBar      = document.getElementById("volume-bar");
const volumeIcon     = document.getElementById("volume-icon");
const autoplayCheck  = document.getElementById("autoplay-check");
const cover          = document.getElementById("cover");
const songTitleEl    = document.getElementById("song-title");
const songArtistEl   = document.getElementById("song-artist");
const playlistEl     = document.getElementById("playlist");
const playlistTitle  = document.getElementById("playlist-title");
const songCountEl    = document.getElementById("song-count");
const tabBtns        = document.querySelectorAll(".tab-btn");

/* ---------- HELPERS ---------- */
function formatTime(seconds) {
  if (isNaN(seconds) || seconds === Infinity) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function parseDuration(str) {
  const [m, s] = str.split(":").map(Number);
  return m * 60 + s;
}

function makeCoverDataUri(song) {
  const initial = song.title.charAt(0).toUpperCase();
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${song.color}"/>
          <stop offset="100%" stop-color="#16213e"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#g)"/>
      <text x="50%" y="54%" font-family="Poppins, sans-serif" font-size="80"
            fill="rgba(255,255,255,0.85)" text-anchor="middle" dominant-baseline="middle">${initial}</text>
    </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/* ---------- RENDER PLAYLIST ---------- */
function renderPlaylist() {
  const list = libraries[currentList];
  playlistEl.innerHTML = "";
  playlistTitle.textContent = currentList === "bollywood" ? "Bollywood Playlist" : "English Playlist";
  songCountEl.textContent = `${list.length} songs`;

  list.forEach((song, index) => {
    const li = document.createElement("li");
    li.className = "playlist-item" + (index === currentIndex ? " playing" : "");
    li.innerHTML = `
      <span class="playlist-num">${index + 1}</span>
      <div class="playlist-info">
        <div class="p-title">${song.title}</div>
        <div class="p-artist">${song.artist}</div>
      </div>
      ${index === currentIndex && isPlaying
        ? `<div class="eq-bars"><span></span><span></span><span></span></div>`
        : `<span class="playlist-duration">${song.duration}</span>`}
    `;
    li.addEventListener("click", () => {
      currentIndex = index;
      loadSong();
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

/* ---------- LOAD / PLAY / PAUSE ---------- */
function loadSong() {
  const song = libraries[currentList][currentIndex];
  audio.src = song.src;
  songTitleEl.textContent = song.title;
  songArtistEl.textContent = song.artist;
  cover.src = makeCoverDataUri(song);
  durationEl.textContent = song.duration; // fallback until real metadata loads
  progressBar.value = 0;
  progressBar.style.setProperty("--progress", "0%");
  currentTimeEl.textContent = "0:00";
  renderPlaylist();
}

function playSong() {
  audio.play().catch(() => {
    /* No audio file found at this src yet — UI still updates normally. */
  });
  isPlaying = true;
  playBtn.textContent = "⏸";
  cover.classList.add("spinning");
  renderPlaylist();
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
  cover.classList.remove("spinning");
  renderPlaylist();
}

function togglePlay() {
  isPlaying ? pauseSong() : playSong();
}

/* ---------- NEXT / PREV / SHUFFLE / REPEAT ---------- */
function nextSong() {
  const list = libraries[currentList];
  if (isShuffle) {
    let rand;
    do { rand = Math.floor(Math.random() * list.length); } while (rand === currentIndex && list.length > 1);
    currentIndex = rand;
  } else {
    currentIndex = (currentIndex + 1) % list.length;
  }
  loadSong();
  if (isPlaying || autoplayCheck.checked) playSong();
}

function prevSong() {
  const list = libraries[currentList];
  currentIndex = (currentIndex - 1 + list.length) % list.length;
  loadSong();
  if (isPlaying || autoplayCheck.checked) playSong();
}

function toggleShuffle() {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active-toggle", isShuffle);
}

function toggleRepeat() {
  repeatMode = (repeatMode + 1) % 3;
  const labels = ["🔁", "🔁", "🔂"];
  repeatBtn.textContent = labels[repeatMode];
  repeatBtn.classList.toggle("active-toggle", repeatMode !== 0);
  repeatBtn.title = ["Repeat off", "Repeat all", "Repeat one"][repeatMode];
}

/* ---------- PROGRESS BAR ---------- */
audio.addEventListener("loadedmetadata", () => {
  if (isFinite(audio.duration)) {
    durationEl.textContent = formatTime(audio.duration);
    progressBar.max = audio.duration;
  }
});

audio.addEventListener("timeupdate", () => {
  if (!isFinite(audio.duration)) return;
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressBar.style.setProperty("--progress", `${pct}%`);
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});

audio.addEventListener("ended", () => {
  if (repeatMode === 2) {
    audio.currentTime = 0;
    playSong();
  } else if (repeatMode === 1 || autoplayCheck.checked) {
    nextSong();
  } else {
    pauseSong();
  }
});

/* ---------- VOLUME ---------- */
volumeBar.addEventListener("input", () => {
  audio.volume = volumeBar.value;
  volumeIcon.textContent = audio.volume === 0 ? "🔇" : audio.volume < 0.5 ? "🔉" : "🔊";
});

volumeIcon.addEventListener("click", () => {
  audio.muted = !audio.muted;
  volumeIcon.textContent = audio.muted ? "🔇" : "🔊";
});

/* ---------- TABS (Bollywood / English) ---------- */
tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentList = btn.dataset.list;
    currentIndex = 0;
    pauseSong();
    loadSong();
  });
});

/* ---------- BUTTON LISTENERS ---------- */
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
shuffleBtn.addEventListener("click", toggleShuffle);
repeatBtn.addEventListener("click", toggleRepeat);

/* ---------- INIT ---------- */
audio.volume = volumeBar.value;
loadSong();
                                      
