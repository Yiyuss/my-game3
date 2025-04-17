// 等待頁面載入後初始化事件
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn'); // 確保取得 'start-btn' 元素
  
  if (startBtn) { // 確保 startBtn 存在
    startBtn.addEventListener('click', () => {
      startGame(); // 呼叫 startGame 函數
    });
  }
});

// 假設 startGame 是一個已經定義的函數，用來啟動遊戲
function startGame() {
  console.log('遊戲開始');
  // 在這裡加入啟動遊戲的邏輯
}
