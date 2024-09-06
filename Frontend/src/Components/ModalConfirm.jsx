import { Button, Dialog, DialogPanel } from '@tremor/react';
import React from 'react';

export function ModalConfirm() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
    <Button className="mx-auto block" onClick={() => setIsOpen(true)}>Open Dialog</Button>
    <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
      <DialogPanel>
        <div className="w-10 h-10 flex justify-center items-center">
        <i className="fa-solid fa-check w-10 h-10 flex justify-center items-center"></i>
        </div>
        <Button className="mt-8 w-full" onClick={() => setIsOpen(false)}>
          <p>Volver al inicio</p>
        </Button>
      </DialogPanel>
    </Dialog>
    </>
  );
}