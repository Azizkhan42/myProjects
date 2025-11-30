const songs = [
  { title: "Song One", artist: "Artist A", src: "song1.mp3" },
  { title: "Song Two", artist: "Artist B", src: "song2.mp3" },
  { title: "Song Three", artist: "Artist C", src: "song3.mp3" },
];

let index = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong(i) {
  index = i;
  audio.src = songs[i].src;
  title.textContent = songs[i].title;
  artist.textContent = songs[i].artist;
}

function playPause() {
  if (audio.paused) audio.play();
  else audio.pause();
}

function nextSong() {
  index = (index + 1) % songs.length;
  loadSong(index);
  audio.play();
}

function prevSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  audio.play();
}

audio.ontimeupdate = () => {
  progress.value = audio.currentTime;
  progress.max = audio.duration;
};

progress.oninput = () => {
  audio.currentTime = progress.value;
};

volume.oninput = () => {
  audio.volume = volume.value;
};

songs.forEach((song, i) => {
  let item = document.createElement("li");
  item.textContent = song.title;
  item.onclick = () => {
    loadSong(i);
    audio.play();
  };
  playlist.appendChild(item);
});

loadSong(0);
