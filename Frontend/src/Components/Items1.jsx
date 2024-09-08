import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Items1 = ({ menuItems = [] }) => {
  return (
    <ul className="space-y-3 font-medium">
      {menuItems.length > 0 ? (
        menuItems.map((item, index) => (
          <li key={index}>
            <a href={item.href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black group">
              <div>
                <FontAwesomeIcon icon={item.icon} className="flex-shrink-0 w-5 h-5 text-gray-500 dark:text-black" />
              </div>
              <span className="flex-1 ms-3 whitespace-nowrap">{item.label}</span>
            </a>
          </li>
        ))
      ) : (
        <li>No items available</li>
      )}
    </ul>
  );
};

export default Items1;
