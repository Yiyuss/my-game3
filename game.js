// game.js（遊戲核心狀態中心）

// 📌 DOM 元素
export const container = document.getElementById('game-container');
export const player = document.getElementById('player');
export const enemy = document.getElementById('enemy');
export const scoreboard = document.getElementById('scoreboard');
export const videoOverlay = document.getElementById('video-overlay');
export const endVideo = document.getElementById('end-video');

// 📌 聲音資源
export const hitSound = document.getElementById('hit-sound');
export const selectSound = document.getElementById('character-select-sound');
export const shootSound = document.getElementById('shoot-sound');
export const explodeSound = document.getElementById('explode-sound');

// 📌 玩家狀態
export const playerPos = { x: 100, y: 100 };
export const targetPos = { x: 100, y: 100 };

// 📌 敵人列表
export const enemies = [];

// 📌 遊戲狀態
export let score = 0;
export let elapsedTime = 0;
export let isGameOver = false;
export let selectedCharacter = null;

// 📌 公開方法（可在其他檔案呼叫）
export function showVideo() {
  videoOverlay.style.display = 'flex';
  endVideo.src = 'https://www.youtube.com/embed/VYOjWnS4cMY?autoplay=1'; // 可自行更改連結
  isGameOver = true;
}
