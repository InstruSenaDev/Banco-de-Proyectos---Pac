import React, { useState } from 'react';
import { X } from 'lucide-react';

const Drawer = ({ children, isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
      )}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-xs bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
          >
            <X size={24} />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

const DrawerDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center p-4">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Abrir Drawer
      </button>

      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Cuenta Creada Exitosamente</h2>
          <p className="text-sm text-gray-600 mb-4">
            Tu cuenta ha sido creada con éxito. Ahora puedes iniciar sesión en tu cuenta.
            Para más información, por favor contáctanos.
          </p>
          <div className="mb-6">
            <p>Este es el cuerpo del drawer, el contenido va aquí.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Volver
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              ¡Entendido!
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default DrawerDemo;