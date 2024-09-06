import { Button, Dialog, DialogPanel } from '@tremor/react';
import React from 'react';
import BotonSegundo from './BotonSegundo';
import Input from './Input';
import InputComent from './InputComent';

export function ModalComent({ buttonColor = 'bg-red-600', text = 'Open' }) {
  const [isOpen, setIsOpen] = React.useState(false);
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
          <Input className="w-full" placeholder={"Correo electronico"}/>
          <InputComent className="w-full h-full" placeholder={"Comentario"} />
        </div>

          <BotonSegundo Text={"Enviar"} bgColor='bg-green-700'/>
        </DialogPanel>
      </Dialog>
    </>
  );
}
