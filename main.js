// main.js

import { initGame, startGameLoop, resetGameState } from './game.js';
import { createPlayer } from './player.js';
import { createEnemy } from './enemy.js';

let selectedCharacter = null;
let gameStarted = false;

const startScreen = document.getElementById('start-screen');
const characterButtons = document.querySelectorAll('.character');
const gameContainer = document.getElementById('game-container');
const timerContainer = document.getElementById('timer-container');
const videoOverlay = document.getElementById('video-overlay');
const endVideo = document.getElementById('end-video');

characterButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedCharacter = button.dataset.character;
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
  resetGameState(); // 初始化敵人、經驗、位置等
  startGameLoop();
}

// ✅ 播放影片結束後重新啟動遊戲
export function showVideo() {
  gameContainer.style.display = 'none';
  timerContainer.style.display = 'none';
  videoOverlay.style.display = 'block';
  endVideo.style.display = 'block';

  endVideo.play();
  endVideo.onended = () => {
    videoOverlay.style.display = 'none';
    endVideo.style.display = 'none';
    resetGameState();  // ✅ 重置遊戲
    gameContainer.style.display = 'block';
    timerContainer.style.display = 'flex';
    startGameLoop();
  };
}

export function resetGame() {
  window.location.reload();
}
