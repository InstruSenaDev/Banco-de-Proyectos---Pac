import React, { useState } from 'react';
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import ModalEstado from '../../Components/ModalesUser/ModalEstado';

const Estado = () => {
  const [isOpen, setIsOpen] = useState(true); // Modal abierto por defecto
  const [estadoProyecto, setEstadoProyecto] = useState('Aceptado'); // Ejemplo de estado

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <LayoutPrincipal title="">
      <ModalEstado estado={estadoProyecto} isOpen={isOpen} onClose={handleClose} />
    </LayoutPrincipal>
  );
};

export default Estado;
