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

  // 撿取經驗物品
  function onExperienceGemCollected(experienceValue) {
    updateExperience(experienceValue); // 撿取經驗物品後增加經驗
  }

  // 敵人死亡後掉落經驗物品的邏輯
  function spawnExperienceGem(x, y) {
    const experienceGem = document.createElement('div');
    experienceGem.classList.add('experience-gem');
    experienceGem.style.left = `${x}px`;
    experienceGem.style.top = `${y}px`;

    // 添加到遊戲容器中
    gameContainer.appendChild(experienceGem);

    // 監聽玩家與經驗物品的碰撞
    const experienceGemRect = experienceGem.getBoundingClientRect();
    document.addEventListener('mousemove', () => {
      // 檢查玩家是否碰到經驗物品
      if (isColliding(player.getBoundingClientRect(), experienceGemRect)) {
        onExperienceGemCollected(20); // 假設每個經驗物品給 20 點經驗
        gameContainer.removeChild(experienceGem); // 撿取後移除該物品
      }
    });
  }

  // 撞擊檢測函數，檢查玩家與經驗物品是否碰撞
  function isColliding(playerRect, gemRect) {
    return !(playerRect.right < gemRect.left || 
             playerRect.left > gemRect.right || 
             playerRect.bottom < gemRect.top || 
             playerRect.top > gemRect.bottom);
  }

  // 假設敵人死亡後會觸發掉落經驗物品
  function onEnemyDefeated(enemy) {
    const enemyPosition = enemy.getBoundingClientRect();
    spawnExperienceGem(enemyPosition.left + enemy.offsetWidth / 2, enemyPosition.top + enemy.offsetHeight / 2);
  }

  // 當敵人死亡時，會呼叫 `onEnemyDefeated`
  // 這樣會在敵人死亡後生成經驗物品，玩家可以透過碰撞來撿取並獲得經驗
});
