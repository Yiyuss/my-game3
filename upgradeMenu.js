// upgradeMenu.js
let upgradeMenu;
let upgradeOptionsContainer;
let onUpgradeSelectedCallback = null;

// 初始化升級選單 UI
export function initUpgradeMenu() {
  upgradeMenu = document.createElement('div');
  upgradeMenu.id = 'upgrade-menu';
  upgradeMenu.style.position = 'absolute';
  upgradeMenu.style.top = '50%';
  upgradeMenu.style.left = '50%';
  upgradeMenu.style.transform = 'translate(-50%, -50%)';
  upgradeMenu.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  upgradeMenu.style.padding = '20px';
  upgradeMenu.style.border = '2px solid white';
  upgradeMenu.style.zIndex = '9999';
  upgradeMenu.style.display = 'none';

  const title = document.createElement('h2');
  title.innerText = '選擇一個升級';
  upgradeMenu.appendChild(title);

  upgradeOptionsContainer = document.createElement('div');
  upgradeOptionsContainer.style.display = 'flex';
  upgradeOptionsContainer.style.flexDirection = 'column';
  upgradeOptionsContainer.style.gap = '10px';

  upgradeMenu.appendChild(upgradeOptionsContainer);
  document.body.appendChild(upgradeMenu);
}

// 顯示升級選單（外部呼叫）
export function showUpgradeMenu(options, onSelect) {
  upgradeOptionsContainer.innerHTML = '';
  onUpgradeSelectedCallback = onSelect;

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.innerText = option.label;
    btn.style.padding = '10px';
    btn.style.fontSize = '18px';
    btn.addEventListener('click', () => {
      hideUpgradeMenu();
      if (onUpgradeSelectedCallback) {
        onUpgradeSelectedCallback(option);
      }
    });
    upgradeOptionsContainer.appendChild(btn);
  });

  upgradeMenu.style.display = 'block';
}

// 隱藏升級選單
export function hideUpgradeMenu() {
  upgradeMenu.style
