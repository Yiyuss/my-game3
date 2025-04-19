// exp.js
// 這個模組負責經驗值的邏輯（增加經驗、升級、顯示等）

// 初始化經驗系統
let exp = 0; // 經驗值
let level = 1; // 玩家等級
let expToLevelUp = 10; // 初始升級所需經驗

// 取得當前等級（提供外部使用）
export function getLevel() {
  return level;
}

// 取得當前經驗值（提供外部使用）
export function getExp() {
  return exp;
}

// 增加經驗值的函式，通常擊敗敵人時會呼叫
export function addExp(amount) {
  exp += amount;

  // 如果經驗值超過升級門檻，就升級
  while (exp >= expToLevelUp) {
    exp -= expToLevelUp; // 扣掉升級用掉的經驗值
    level++; // 升級
    expToLevelUp = Math.floor(expToLevelUp * 1.5); // 每次升級所需經驗值會變多
    console.log(`🎉 升級了！現在是 Lv.${level}`);
    showLevelUpMessage(); // 顯示升級提示
  }

  // 更新畫面上的經驗值條（如果有的話）
  updateExpDisplay();
}

// 顯示升級提示文字
function showLevelUpMessage() {
  const msg = document.createElement('div');
  msg.textContent = `🎉 Lv.${level}！`;
  msg.className = 'level-up-message';
  document.body.appendChild(msg);

  // 1 秒後自動消失
  setTimeout(() => {
    msg.remove();
  }, 1000);
}

// 更新畫面上的經驗條或數字（未來可擴充）
function updateExpDisplay() {
  const expBar = document.getElementById('exp-bar');
  const expText = document.getElementById('exp-text');

  if (expBar) {
    const percent = (exp / expToLevelUp) * 100;
    expBar.style.width = `${percent}%`;
  }

  if (expText) {
    expText.textContent = `Lv.${level} - EXP: ${exp}/${expToLevelUp}`;
  }
}
