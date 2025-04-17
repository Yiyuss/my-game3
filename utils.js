export function getRandomPosition() {
  const container = document.getElementById('game-container');
  const width = container.clientWidth - 50;
  const height = container.clientHeight - 50;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
  };
}

export function isVideoPlaying() {
  const iframe = document.getElementById('end-video');
  return iframe && iframe.src.includes('autoplay=1');
}
