export function showVideo(callback) {
  const overlay = document.getElementById('video-overlay');
  const player = document.getElementById('video-player');
  overlay.style.display = 'flex';
  player.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';

  player.onended = () => {
    hideVideo();
    callback();
  };

  // 針對某些瀏覽器觸發機制
  setTimeout(() => {
    player.focus();
  }, 500);
}

export function hideVideo() {
  const overlay = document.getElementById('video-overlay');
  const player = document.getElementById('video-player');
  player.src = '';
  overlay.style.display = 'none';
}
