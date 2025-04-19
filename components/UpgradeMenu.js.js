// 引入 React
import React from 'react';

// 這是一個 React 元件，會接收兩個參數：options（選項）、onSelect（點選後執行）
const UpgradeMenu = ({ options, onSelect }) => {
  return (
    <div className="upgrade-menu"> {/* 外層容器 */}
      <h2>選擇一個升級：</h2>
      <ul>
        {options.map((option, index) => ( // 把每個選項用按鈕顯示出來
          <li key={index}>
            <button onClick={() => onSelect(option)}>{option.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 將這個元件匯出，之後其他檔案可以使用
export default UpgradeMenu;
