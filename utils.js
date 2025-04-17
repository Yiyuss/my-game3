import { container, videoOverlay } from './game.js';

// 取得隨機位置，避免超出遊戲容器範圍
export function getRandomPosition() {
  const rect = container.getBoundingClientRect();
  const x = Math.random() * (rect.width - 50);  // 確保敵人不會超過容器邊界
  const y = Math.random() * (rect.height - 50);  // 確保敵人不會超過容器邊界
  return { x, y };
}

// 檢查視頻是否正在播放
export function isVideoPlaying() {
  return videoOverlay.style.display === 'flex';  // 根據覆蓋層顯示狀態判斷
}
