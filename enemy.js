let enemyCount = 0;

export function createEnemy() {
  const enemy = document.createElement('div');
  enemy.className = 'enemy';
  enemy.style.width = '60px';
  enemy.style.height = '60px';
  enemy.style.backgroundImage = "url('https://i.imgur.com/NPnmEtr.png')";
  enemy.style.position = 'absolute';

  enemy.style.left = `${Math.random() * (1024 - 60)}px`;
  enemy.style.top = `${Math.random() * (576 - 60)}px`;
  enemy.id = `enemy-${enemyCount++}`;

  return enemy;
}

export function removeAllEnemies() {
  const enemies = document.querySelectorAll('.enemy');
  enemies.forEach(e => e.remove());
}
