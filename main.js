import { resetGame, gameRunning, gameInterval, enemyInterval, updateGame, spawnEnemy, container, player, targetPos } from './game.js';
import { isVideoPlaying } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ DOM 已就緒，開始初始化");

  // 控制角色選擇
  const characterSelection = document.getElementById('character-selection');
  const gameContainer = document.getElementById('game-container');
  const playerDiv = document.getElementById('player');
  const characterImages = document.querySelectorAll('.character');
  const selectSound = document.getElementById('character-select-sound');

  // 角色選擇事件
  document.getElementById('character1').addEventListener('click', () => startGame('character1'));
  document.getElementById('character2').addEventListener('click', () => startGame('character2'));

  // 經驗相關
  let currentExperience = 0;
  let currentLevel = 1;
  const experienceToLevelUp = 100; // 每個等級所需經驗值

  // 更新經驗條
  function updateExperience(experience) {
    currentExperience += experience;

    // 計算經驗條進度
    let progress = (currentExperience / experienceToLevelUp) * 100;
    if (progress > 100) {
      progress = 100;
      levelUp();
    }

    // 更新經驗條填充
    document.getElementById('experience-fill').style.width = progress + '%';
  }

  // 等級提升邏輯
  function levelUp() {
    currentLevel++;
    currentExperience = 0; // 重置經驗

    // 更新等級顯示
    document.getElementById('level-ui').textContent = `Lv. ${currentLevel}`;
  }

  // 開始遊戲
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

  // 滑鼠移上角色播放音效
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

  // 每次敵人被擊中時增加經驗
  function onEnemyDefeat() {
    updateExperience(20); // 假設每次擊敗敵人增加 20 點經驗
  }

  // 假設每個敵人死亡都觸發 onEnemyDefeat
  // 如果有敵人死亡的邏輯，請在適當的地方呼叫 onEnemyDefeat()

});
