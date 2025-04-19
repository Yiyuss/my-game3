import { resetGame, gameRunning, container, player, targetPos, registerGemUpdater } from './game.js';
import { isVideoPlaying } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ DOM 已就緒，開始初始化");

  const characterSelection = document.getElementById('character-selection');
  const gameContainer = document.getElementById('game-container');
  const playerDiv = document.getElementById('player');
  const characterImages = document.querySelectorAll('.character');
  const selectSound = document.getElementById('character-select-sound');

  // ✅ 強制設定遊戲背景圖，避免黑畫面
  gameContainer.style.backgroundImage = 'url("your-background-image.jpg")'; // 替換為你的背景圖連結
  gameContainer.style.backgroundSize = 'cover';
  gameContainer.style.backgroundPosition = 'center';

  // 角色選擇事件
  document.getElementById('character1').addEventListener('click', () => startGame('character1'));
  document.getElementById('character2').addEventListener('click', () => startGame('character2'));

  // 經驗與等級
  let currentExperience = 0;
  let currentLevel = 1;
  const experienceToLevelUp = 100;

  function updateExperience(experience) {
    currentExperience += experience;
    let progress = (currentExperience / experienceToLevelUp) * 100;
    if (progress >= 100) {
      levelUp();
      progress = 0;
    }
    document.getElementById('experience-fill').style.width = progress + '%';
  }

  function levelUp() {
    currentLevel++;
    currentExperience = 0;
    document.getElementById('level-ui').textContent = `Lv. ${currentLevel}`;
  }

  function startGame(characterId) {
    characterSelection.style.display = 'none';
    gameContainer.style.display = 'block';
    document.getElementById('scoreboard').style.display = 'block';
    gameContainer.classList.remove('initialized');

    if (characterId === 'character1') {
      playerDiv.style.backgroundImage = 'url("https://i.imgur.com/JFTxfva.png")';
    } else if (characterId === 'character2') {
      playerDiv.style.backgroundImage = 'url("https://i.imgur.com/NPnmEtr.png")';
    }

    resetGame();
  }

  characterImages.forEach(character => {
    character.addEventListener('mouseenter', () => {
      selectSound.play();
    });
  });

  // 點擊移動玩家
  document.addEventListener('click', (e) => {
    if (!gameRunning || isVideoPlaying()) return;
    const rect = container.getBoundingClientRect();
    targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
    targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
  });

  // ✅ 經驗寶石系統（集中管理）
  const experienceGems = [];

  function spawnExperienceGem(x, y) {
    const gem = document.createElement('div');
    gem.classList.add('experience-gem');
    gem.style.left = `${x}px`;
    gem.style.top = `${y}px`;
    gameContainer.appendChild(gem);
    experienceGems.push(gem);
  }

  function onExperienceGemCollected(value = 20) {
    updateExperience(value);
  }

  function isColliding(rect1, rect2) {
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  }

  // ✅ 將更新邏輯註冊給 game.js 中的主循環
  registerGemUpdater(() => {
    experienceGems.forEach((gem, index) => {
      const gemRect = gem.getBoundingClientRect();
      const playerRect = player.getBoundingClientRect();
      if (isColliding(playerRect, gemRect)) {
        onExperienceGemCollected(20);
        gameContainer.removeChild(gem);
        experienceGems.splice(index, 1);
      }
    });
  });

  // 提供外部調用的 API，讓敵人死亡後呼叫此方法
  window.onEnemyDefeated = (enemy) => {
    const rect = enemy.getBoundingClientRect();
    const x = rect.left + enemy.offsetWidth / 2;
    const y = rect.top + enemy.offsetHeight / 2;
    spawnExperienceGem(x, y);
  };
});
