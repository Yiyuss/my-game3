export let playerLevel = 1; // 玩家等級
export let playerExp = 0;   // 當前經驗
export let expToNextLevel = 100; // 初始升級所需經驗

// 增加經驗的函數
export function addExp(amount) {
  playerExp += amount;
  checkLevelUp();     // 檢查是否升級
  updateExpBar();     // 更新經驗條
}

// 檢查是否升級
function checkLevelUp() {
  while (playerExp >= expToNextLevel) {
    playerExp -= expToNextLevel;
    levelUp();
  }
}

// 執行升級邏輯
function levelUp() {
  playerLevel++;
  expToNextLevel = Math.floor(expToNextLevel * 1.5); // 每次升級變更難

  // 更新UI
  const levelEl = document.getElementById('player-level');
  if (levelEl) levelEl.textContent = `等級：${playerLevel}`;

  showUpgradeMenu(); // 顯示升級選單
}

// 更新經驗條
export function updateExpBar() {
  const fill = document.getElementById('experience-fill');
  const percentage = (playerExp / expToNextLevel) * 100;
  if (fill) fill.style.width = `${Math.min(percentage, 100)}%`;
}

// 顯示升級選單
export function showUpgradeMenu() {
  const upgradeMenu = document.getElementById('upgrade-menu');
  if (!upgradeMenu) return;

  upgradeMenu.style.display = 'block';
  upgradeMenu.innerHTML = '<h2>升級選擇</h2>';

  const options = ['增加攻擊力', '增加移動速度', '增加最大血量'];
  options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.textContent = option;
    optionElement.style.cursor = 'pointer';
    optionElement.style.margin = '10px 0';
    optionElement.onclick = () => {
      applyUpgrade(index);
      upgradeMenu.style.display = 'none';
    };
    upgradeMenu.appendChild(optionElement);
  });
}

// 處理升級後的效果
function applyUpgrade(index) {
  switch (index) {
    case 0:
      // TODO: 增加攻擊力邏輯
      break;
    case 1:
      // TODO: 增加移動速度邏輯
      break;
    case 2:
      // TODO: 增加最大血量邏輯
      break;
  }
}
