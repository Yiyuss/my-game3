import { resetGame, gameInterval, enemyInterval, updateGame, spawnEnemy, gameRunning, targetPos } from './game.js';

const player = document.getElementById('player');
const characterSelect = document.getElementById('character-select');
const characterImages = document.querySelectorAll('.character');

export function setupEvents() {
  document.addEventListener('mousemove', (e) => {
    const rect = document.getElementById('game-container').getBoundingClientRect();
    targetPos.x = e.clientX - rect.left;
    targetPos.y = e.clientY - rect.top;
  });

  characterImages.forEach(img => {
    img.addEventListener('click', () => {
      const selectedCharacter = img.getAttribute('data-character');
      startGame(selectedCharacter);
    });
  });
}

function startGame(character) {
  // 設定玩家圖片
  if (character === 'hero1') {
    player.style.backgroundImage = "url('https://i.imgur.com/JFTxfva.png')";
  } else if (character === 'hero2') {
    player.style.backgroundImage = "url('https://i.imgur.com/NPnmEtr.png')";
  }

  characterSelect.style.display = 'none'; // 隱藏選角畫面

  resetGame();

  gameRunning.value = true;
  gameInterval.value = setInterval(updateGame, 1000 / 60);
  enemyInterval.value = setInterval(spawnEnemy, 5000);
}
