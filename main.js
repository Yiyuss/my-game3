// main.js

import { initGame, startGameLoop, stopGameLoop } from './game.js';
import { createPlayer } from './player.js';
import { createEnemy } from './enemy.js';

let selectedCharacter = null;
let gameStarted = false;

const startScreen = document.getElementById('start-screen');
const characterButtons = document.querySelectorAll('.character');
const gameContainer = document.getElementById('game-container');
const timerContainer = document.getElementById('timer-container');
const videoContainer = document.getElementById('video-container');
const endVideo = document.getElementById('end-video');

characterButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedCharacter = button.dataset.character;
    console.log("選擇的角色：", selectedCharacter);  // 確保這裡顯示的角色是正確的

    // 播放音效
    const characterSelectSound = document.getElementById('character-select-sound');
    characterSelectSound.play();

    startGame();
  });
});

function startGame() {
  if (gameStarted || !selectedCharacter) return;
  gameStarted = true;

  startScreen.style.display = 'none';
  gameContainer.style.display = 'block';
  timerContainer.style.display = 'flex';

  initGame(selectedCharacter);
  startGameLoop();
}

export function showVideo() {
  stopGameLoop();
  gameContainer.style.display = 'none';
  timerContainer.style.display = 'none';
  videoContainer.style.display = 'flex';
  endVideo.src = 'https://www.youtube.com/embed/F1vQ2GpIWgQ?autoplay=1&controls=0&modestbranding=1';
}

export function resetGame() {
  window.location.reload();
}
