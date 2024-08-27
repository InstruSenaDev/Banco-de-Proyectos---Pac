import React from 'react';

const Modal = ({text}) => {

  // Función para manejar el cierre del modal
  const closeModal = () => {
    // Implementa aquí la lógica para cerrar el modal
    console.log("Cerrar modal"); // Ejemplo de implementación
  };

  return (
    <div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-[#B9B9B9] bg-opacity-70 hidden">
      <div className="bg-white rounded shadow-lg w-96 max-[768px]:w-[20rem]">
        <div className="border-b px-4 py-2 flex justify-end items-center">
          <button className="text-black closed-modal close-modal" onClick={closeModal}>
            &cross;
          </button>
        </div>
        <div className="border-b px-4 py-2 flex flex-col justify-center items-center">
          <span className="font-Josefin-Slab">{text}</span>
          <img className="" src="/Img/checkmark.png" alt="Checkmark"/>
        </div>
      </div>
    </div>
  );
};

export default Modal;
