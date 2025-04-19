// src/components/UpgradeMenu.js

import React from 'react';

const UpgradeMenu = ({ options, onSelect }) => {
  return (
    <div className="upgrade-menu">
      <h2>選擇一個升級：</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <button onClick={() => onSelect(option)}>{option.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpgradeMenu;
