// upgradeMenu.js

let upgradeMenu = null;

// 初始化選單 DOM 並插入到畫面
export function initUpgradeMenu() {
  upgradeMenu = document.createElement('div');
  upgradeMenu.id = 'upgrade-menu';
  upgradeMenu.style.position = 'absolute';
  upgradeMenu.style.top = '50%';
  upgradeMenu.style.left = '50%';
  upgradeMenu.style.transform = 'translate(-50%, -50%)';
  upgradeMenu.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  upgradeMenu.style.border = '2px solid white';
  upgradeMenu.style.padding = '20px';
  upgradeMenu.style.display = 'none';
  upgradeMenu.style.flexDirection = 'column';
  upgradeMenu.style.alignItems = 'center';
  upgradeMenu.style.zIndex = '9999';

  // 加入三個按鈕（可先固定）
  const options = [
    { text: '增加最大血量 +10', apply: () => alert('血量增加！') },
    { text: '技能A：範圍攻擊', apply: () => alert('技能A獲得！') },
    { text: '技能B：擊退敵人', apply: () => alert('技能B獲得！') }
  ];

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt.text;
    btn.style.margin = '10px';
    btn.onclick = () => {
      opt.apply();
      hideUpgradeMenu();
    };
    upgradeMenu.appendChild(btn);
  });

  document.body.appendChild(upgradeMenu);
}

// 顯示升級選單
export function showUpgradeMenu() {
  upgradeMenu.style.display = 'flex';
}

// 隱藏升級選單
export function hideUpgradeMenu() {
  upgradeMenu.style.display = 'none';
}
