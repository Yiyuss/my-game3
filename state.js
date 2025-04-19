// 📦 遊戲全域狀態資料統一管理
export const state = {
  gameRunning: false,
  score: 0,
  time: 0,

  player: {
    element: null,
    pos: { x: 200, y: 200 },
    target: { x: 200, y: 200 },
  },

  enemies: [],
  bullets: [],

  audio: {
    shoot: null,
    explode: null,
    hit: null,
    select: null,
  },

  ui: {
    scoreEl: null,
    timeEl: null,
    container: null,
    videoOverlay: null,
    endVideo: null,
  }
};
