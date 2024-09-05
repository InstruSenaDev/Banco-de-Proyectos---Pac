import { Button, Dialog, DialogPanel } from '@tremor/react';
import React from 'react';

export function ModalComent({ isOpen, onClose, content }) {
  return (
    <Dialog open={isOpen} onClose={onClose} static={true}>
      <DialogPanel>
        <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">{content}</h3>
        <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          {content === "Aprobar" && "Estás seguro que deseas aprobar este proyecto?"}
          {content === "Devolver" && "Por favor, proporciona una razón para devolver el proyecto."}
          {content === "Rechazar" && "Estás seguro que deseas rechazar este proyecto?"}
        </p>
        <Button className="mt-8 w-full" onClick={onClose}>
          Cerrar
        </Button>
      </DialogPanel>
    </Dialog>
  );
}
