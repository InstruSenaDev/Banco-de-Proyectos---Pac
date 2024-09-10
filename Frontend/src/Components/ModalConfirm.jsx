import React from 'react';
import { Button, Dialog, DialogPanel, Card, Text } from '@tremor/react';


export function ModalConfirm({ onClose }) {
  const [isOpen, setIsOpen] = React.useState(true);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} static={true}>
      <DialogPanel>
        <Card className="max-w-md mx-auto">
          <div className="flex flex-col items-center text-center">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Proyecto Revisado
            </Text>
            <Text className="text-gray-600 mb-6">
              El proyecto ha sido revisado exitosamente.
            </Text>
            <Button
              className="w-full"
              size="xl"
              variant="primary"
              onClick={handleClose}
            >
              Volver al inicio
            </Button>
          </div>
        </Card>
      </DialogPanel>
    </Dialog>
  );
}