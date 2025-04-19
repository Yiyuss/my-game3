import { playerPos, targetPos, player, container } from './game.js';

// 移動玩家角色
export function movePlayer() {
  const speed = 5;
  const dx = targetPos.x - playerPos.x;
  const dy = targetPos.y - playerPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // 若角色已經接近目標點，將位置設置為目標點
  if (distance < speed) {
    playerPos.x = targetPos.x;
    playerPos.y = targetPos.y;
  } else {
    // 按照距離方向移動角色
    playerPos.x += (dx / distance) * speed;
    playerPos.y += (dy / distance) * speed;
  }

  // 限制角色不會超出邊界
  const maxX = container.clientWidth - player.offsetWidth;
  const maxY = container.clientHeight - player.offsetHeight;
  playerPos.x = Math.max(0, Math.min(playerPos.x, maxX));
  playerPos.y = Math.max(0, Math.min(playerPos.y, maxY));

  // 更新角色位置
  player.style.left = playerPos.x + 'px';
  player.style.top = playerPos.y + 'px';
}

// 升級系統：經驗與等級
let currentXP = 0;
let currentLevel = 1;

function getXPForLevel(level) {
  return level * 100;
}

function addXP(amount) {
  currentXP += amount;
  const xpForNextLevel = getXPForLevel(currentLevel);
  if (currentXP >= xpForNextLevel) {
    currentXP -= xpForNextLevel;
    currentLevel++;
    document.getElementById('level-display').textContent = `Level: ${currentLevel}`;
  }
  updateXPBar();
}

function updateXPBar() {
  const xpForNextLevel = getXPForLevel(currentLevel);
  const xpPercentage = (currentXP / xpForNextLevel) * 100;
  document.getElementById('exp-fill').style.width = `${xpPercentage}%`;
}

// 暴露給外部使用
export { addXP, updateXPBar };

// 升級系統資料
let level = 1;            // 玩家等級
let currentXP = 0;        // 當前經驗
let xpToNextLevel = 100;  // 升級所需經驗

// 經驗條與等級文字的 DOM
const levelText = document.getElementById('levelText');
const expBar = document.getElementById('expBar');

// 增加經驗值並檢查是否升級
export function addXP(amount) {
  currentXP += amount;

  // 如果經驗值超過升級所需，就升級
  while (currentXP >= xpToNextLevel) {
    currentXP -= xpToNextLevel;
    level++;
    xpToNextLevel = Math.floor(xpToNextLevel * 1.2);  // 每次升級提高門檻

    // TODO：你可以在這裡加入升級特效，例如回血或變強
    console.log('升級！當前等級：', level);
  }

  // 更新畫面上的經驗條與等級
  levelText.textContent = `Lv. ${level}`;
  const progressPercent = (currentXP / xpToNextLevel) * 100;
  expBar.style.width = `${progressPercent}%`;
}
