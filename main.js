import { startGame } from './game.js';
import { setPlayerCharacter } from './player.js';

document.addEventListener('DOMContentLoaded', () => {
  const characterSelect = document.getElementById('character-select');
  const gameContainer = document.getElementById('game-container');
  
  const character1 = document.getElementById('character1');
  const character2 = document.getElementById('character2');
  
  character1.addEventListener('click', () => {
    setPlayerCharacter('https://i.imgur.com/JFTxfva.png'); // 角色1圖片
    startGame();
    characterSelect.style.display = 'none';
    gameContainer.style.display = 'block';
  });

  character2.addEventListener('click', () => {
    setPlayerCharacter('https://i.imgur.com/NPnmEtr.png'); // 角色2圖片
    startGame();
    characterSelect.style.display = 'none';
    gameContainer.style.display = 'block';
  });
});
