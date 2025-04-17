// player.js
function movePlayer(playerPos, targetPos, player) {
  const speed = 4;
  const dx = targetPos.x - playerPos.x;
  const dy = targetPos.y - playerPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > speed) {
    playerPos.x += (dx / distance) * speed;
    playerPos.y += (dy / distance) * speed;
    player.style.left = playerPos.x + 'px';
    player.style.top = playerPos.y + 'px';
  }
}

export { movePlayer };
