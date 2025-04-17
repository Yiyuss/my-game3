import { container, videoOverlay } from './game.js';

export function getRandomPosition() {
  const rect = container.getBoundingClientRect();
  const x = Math.random() * (rect.width - 50);
  const y = Math.random() * (rect.height - 50);
  return { x, y };
}

export function isVideoPlaying() {
  return videoOverlay.style.display === 'flex';
}
