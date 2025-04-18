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

  // 玩家吃到敵人掉落的經驗
  function onExperienceGemCollected(experienceValue) {
    updateExperience(experienceValue); // 撿取經驗物品後增加經驗
  }

  // 假設有敵人掉落經驗物品，玩家碰到經驗物品後觸發 onExperienceGemCollected
  // 這可以連接到掉落物品生成的邏輯，當玩家碰到掉落的經驗物品時會調用此函數

  // 例如，假設你有一個 `experienceGem` 物件，玩家碰到後會呼叫 `onExperienceGemCollected(experienceValue)`
  // 其中 `experienceValue` 是每個經驗物品提供的經驗數量，這裡假設每個經驗物品給予 20 點經驗

  // 敵人死亡後掉落經驗物品的邏輯可以類似於這樣
  function spawnExperienceGem(x, y) {
    // 這裡的掉落邏輯取決於你的遊戲，當敵人死亡時創建經驗物品並放置在畫面中
    const experienceGem = document.createElement('div');
    experienceGem.classList.add('experience-gem');
    experienceGem.style.left = `${x}px`;
    experienceGem.style.top = `${y}px`;

    // 添加到遊戲容器中
    gameContainer.appendChild(experienceGem);

    // 當玩家碰到經驗物品時，調用 onExperienceGemCollected
    experienceGem.addEventListener('click', () => {
      onExperienceGemCollected(20); // 假設每個經驗物品給 20 點經驗
      gameContainer.removeChild(experienceGem); // 撿取後移除該物品
    });
  }

  // 這是敵人死亡後掉落經驗物品的範例，將根據你的遊戲邏輯來實現掉落經驗物品
  function onEnemyDefeated(enemy) {
    const enemyPosition = enemy.getBoundingClientRect();
    spawnExperienceGem(enemyPosition.left + enemy.offsetWidth / 2, enemyPosition.top + enemy.offsetHeight / 2);
  }

  // 假設有敵人死亡的邏輯，當敵人死亡時會調用 `onEnemyDefeated`
  // 這樣會在敵人死亡後生成經驗物品，玩家撿到經驗物品後會增加經驗
});
