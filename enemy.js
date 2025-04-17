export function spawnEnemy() {
  const enemy = document.createElement('div');
  enemy.style.position = 'absolute';
  enemy.style.backgroundImage = 'url("https://i.imgur.com/NPnmEtr.png")';
  enemy.style.width = '50px';
  enemy.style.height = '50px';
  // 設置敵人的隨機位置，動畫等
  container.appendChild(enemy);
}
