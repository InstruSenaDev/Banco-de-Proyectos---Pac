import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogPanel, Title, Text, TextInput } from '@tremor/react';

export function ModalComent({ email: initialEmail = '', buttonColor = 'bg-[#A3E784]', text = 'Abrir comentario', onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState(initialEmail);
  const [comentario, setComentario] = useState('');

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  const handleOpenConfirm = () => {
    if (onSubmit) {
      onSubmit({ email, comentario }); // Envía tanto el email como el comentario
    }
    setIsOpen(false);
    setEmail(''); // Resetea el email
    setComentario(''); // Resetea el comentario
  };

  return (
    <>
      <Button
        className={`${buttonColor} text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300`}
        onClick={() => setIsOpen(true)}
      >
        {text}
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true}>
        <DialogPanel className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <Title>Añadir Comentario</Title>
          </div>

          <Text className="mb-2">Por favor, ingrese su correo electrónico:</Text>
          <TextInput
            className="mb-4"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Text className="mb-2">Por favor, ingrese su comentario a continuación:</Text>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            rows="4"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escriba su comentario aquí..."
          />

          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleOpenConfirm}
              className="bg-[#A3E784] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Enviar
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
