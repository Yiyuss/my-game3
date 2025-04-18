export let playerLevel = 1; // 玩家等級
export let playerExp = 0; // 玩家經驗
export let expToNextLevel = 100; // 每個等級所需經驗

export function addExp(amount) {
  playerExp += amount;
  if (playerExp >= expToNextLevel) {
    levelUp();
  }
}

function levelUp() {
  playerLevel++;
  playerExp = 0;
  expToNextLevel *= 1.5; // 每升級一次所需經驗增加
  showUpgradeMenu(); // 彈出升級選單
}

export function showUpgradeMenu() {
  const upgradeMenu = document.getElementById('upgrade-menu');
  upgradeMenu.style.display = 'block';
  
  // 先清空之前的選項
  upgradeMenu.innerHTML = '<h2>升級選擇</h2>'; 

  const options = ['增加攻擊力', '增加移動速度', '增加最大血量'];
  options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.textContent = option;
    optionElement.onclick = () => {
      applyUpgrade(index);
      upgradeMenu.style.display = 'none'; // 隱藏選單
    };
    upgradeMenu.appendChild(optionElement);
  });
}

function applyUpgrade(index) {
  switch (index) {
    case 0:
      // 增加攻擊力
      break;
    case 1:
      // 增加移動速度
      break;
    case 2:
      // 增加最大血量
      break;
    default:
      break;
  }
}
