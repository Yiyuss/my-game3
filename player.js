export function movePlayer(container, player, playerPos, targetPos) {
  let dx = targetPos.x - playerPos.x;
  let dy = targetPos.y - playerPos.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  let speed = 4;

  if (dist > speed) {
    playerPos.x += (dx / dist) * speed;
    playerPos.y += (dy / dist) * speed;

    const maxX = container.clientWidth - player.offsetWidth;
    const maxY = container.clientHeight - player.offsetHeight;

    playerPos.x = Math.max(0, Math.min(playerPos.x, maxX));
    playerPos.y = Math.max(0, Math.min(playerPos.y, maxY));

    player.style.left = playerPos.x + 'px';
    player.style.top = playerPos.y + 'px';
  }
}
