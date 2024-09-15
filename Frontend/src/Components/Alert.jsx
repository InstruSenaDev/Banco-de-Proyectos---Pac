import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri'; // Usa react-icons en lugar de remixicon

const Callout = ({ title, icon, children }) => (
  <div className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800" role="alert">
    <div className="flex">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="ml-3">
        <p className="font-medium">{title}</p>
        <p>{children}</p>
      </div>
    </div>
  </div>
);

export default Callout;
