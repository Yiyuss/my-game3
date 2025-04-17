// events.js
import { startGame, resetGame } from './game.js';
import { player } from './player.js';

let selectedCharacter = '';

export function showCharacterSelectScreen() {
  const selectScreen = document.getElementById('character-select-screen');
  selectScreen.style.display = 'flex';

  const characterImages = selectScreen.querySelectorAll('.character-image');

  characterImages.forEach(img => {
    img.addEventListener('mouseover', () => {
      img.classList.add('highlight');
    });

    img.addEventListener('mouseout', () => {
      img.classList.remove('highlight');
    });

    img.addEventListener('click', () => {
      selectedCharacter = img.src;
      player.image.src = selectedCharacter;

      selectScreen.style.display = 'none';
      document.getElementById('game-container').style.display = 'block';
      startGame();
    });
  });
}

export function getSelectedCharacter() {
  return selectedCharacter;
}

export function setupEventListeners() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      player.direction = 'left';
    } else if (e.key === 'ArrowRight') {
      player.direction = 'right';
    } else if (e.key === 'ArrowUp') {
      player.direction = 'up';
    } else if (e.key === 'ArrowDown') {
      player.direction = 'down';
    }
  });

  document.addEventListener('keyup', () => {
    player.direction = null;
  });

  document.getElementById('restart-button').addEventListener('click', () => {
    resetGame();
  });
}
