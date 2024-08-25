import React from 'react';

const Itemss1 = ({ href, label, icon }) => {
  return (
    <li>
      <a href={href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black group">
        <div>
          {icon ? (
            <i className={`${icon} flex-shrink-0 w-5 h-5 text-gray-500 dark:text-black`} aria-hidden="true"></i>
          ) : (
            <svg className="" aria-hidden="true">
              {/* Aquí puedes agregar contenido al SVG si es necesario */}
            </svg>
          )}
        </div>
        <span className="flex-1 ms-3 whitespace-nowrap pl-3">
          {label}
        </span>
      </a>
    </li>
  );
};

export default Itemss1;
