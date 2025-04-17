export function getRandomPosition(container, enemies) {
  const minDist = 60;
  const width = container.clientWidth;
  const height = container.clientHeight;

  let newPos, overlap = true;
  while (overlap) {
    overlap = false;
    newPos = {
      x: Math.random() * (width - 50),
      y: Math.random() * (height - 50)
    };

    for (let i = 0; i < enemies.length; i++) {
      let dist = Math.sqrt(
        Math.pow(newPos.x - enemies[i].pos.x, 2) + Math.pow(newPos.y - enemies[i].pos.y, 2)
      );
      if (dist < minDist) {
        overlap = true;
        break;
      }
    }
  }

  return newPos;
}
