import React, { createContext, useState } from 'react';

// Crear el contexto
export const SearchContext = createContext();

// Crear el proveedor de contexto
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
