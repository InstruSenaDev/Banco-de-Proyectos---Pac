import { Button, Dialog, DialogPanel } from '@tremor/react';
import React, { useState } from 'react';
import BotonSegundo from './BotonSegundo';
import InputComent from './InputComent';

export function ModalComent({ buttonColor = 'bg-red-600', text = 'Open', onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [comentario, setComentario] = useState('');

  const handleSubmit = () => {
    // Llama a la función onSubmit que viene del componente padre y pasa el comentario
    if (onSubmit) {
      onSubmit(comentario);
    }
    setIsOpen(false); // Cierra el modal después de enviar
  };

  return (
    <>
      <BotonSegundo 
        className="mx-auto flex flex-row" 
        bgColor={buttonColor}  
        Text={text} 
        onClick={() => setIsOpen(true)} 
      />
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <div className="w-full">
            <InputComent 
              className="w-full h-full" 
              placeholder="Comentario" 
              value={comentario}
              onChange={(e) => setComentario(e.target.value)} 
            />
          </div>
          <BotonSegundo 
            Text="Enviar" 
            bgColor="bg-green-700" 
            onClick={handleSubmit}
          />
        </DialogPanel>
      </Dialog>
    </>
  );
}
