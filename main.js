import { resetGame, player } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  const characterSelection = document.getElementById('character-selection');
  const gameContainer = document.getElementById('game-container');
  const characterOptions = document.querySelectorAll('.character-option');

  characterOptions.forEach(option => {
    option.addEventListener('click', () => {
      const selectedSrc = option.getAttribute('src');
      player.style.backgroundImage = `url("${selectedSrc}")`;

      characterSelection.style.display = 'none';
      gameContainer.style.display = 'block';
      resetGame();
    });
  });
});
