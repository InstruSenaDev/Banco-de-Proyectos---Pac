import React from 'react';

const MenuComponent = ({ menuItems = [] }) => {
    return (
        <ul className="space-y-3 font-medium">
            {menuItems.length > 0 ? (
                menuItems.map((item, index) => (
                    <li key={index}>
                        <a
                            href={item.href}
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black group"
                        >
                            <div>
                                {item.icon ? (
                                    <i
                                        className={`${item.icon} flex-shrink-0 w-5 h-5 text-gray-500 dark:text-black`}
                                        aria-hidden="true"
                                    ></i>
                                ) : (
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 dark:text-black"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 18 18"
                                    >
                                        {/* SVG path here */}
                                    </svg>
                                )}
                            </div>
                            <span className="flex-1 ms-3 whitespace-nowrap">
                                {item.label}
                            </span>
                        </a>
                    </li>
                ))
            ) : (
                <li className="p-2 text-gray-500">No hay ítems disponibles</li>
            )}
        </ul>
    );
};

export default MenuComponent;