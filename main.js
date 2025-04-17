import { initGame } from './game.js';
import { setPlayerImage } from './player.js';

const characterSelect = document.getElementById('character-select');
const characterImages = document.querySelectorAll('.character');

characterImages.forEach(img => {
  img.addEventListener('click', () => {
    const selected = img.getAttribute('data-character');
    const player = document.getElementById('player');
    player.style.backgroundImage = `url('https://i.imgur.com/${selected}.png')`;
    characterSelect.style.display = 'none';
    initGame();
  });
});
