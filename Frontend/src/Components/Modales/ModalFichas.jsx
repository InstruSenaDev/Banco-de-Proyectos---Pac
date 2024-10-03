import PropTypes from 'prop-types';
import { useState } from 'react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import { useFichaForm } from '../../../hooks/SuperAdmin/useFichaForm';

export default function ModalFicha({ onClose, onAddFicha }) {
  const { formValues, errors, handleInputChange, handleSubmit, isSubmitting } = useFichaForm((data) => {
    onAddFicha(data); // Actualizar vista con la nueva ficha
    setSuccessMessage('Registro exitoso'); // Mensaje de éxito
    setTimeout(() => {
      onClose(); // Cerrar modal después de 2 segundos
    }, 2000);
  });

  const [successMessage, setSuccessMessage] = useState(''); // Manejo del mensaje de éxito

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitting) {
      handleSubmit(e);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} static={true} className="z-[100]">
      <DialogPanel className="sm:max-w-md">
        <button
          type="button"
          className="absolute right-4 top-4 p-2 bg-transparent border-none"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <i className="fas fa-times size-5" aria-hidden={true}></i>
        </button>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <h4 className="font-semibold">Añade nueva ficha</h4>

          <div className="flex flex-col p-[5%] space-y-4">
            <div className="col-span-full sm:col-span-3 space-y-2">
              {/* Campo para el nombre del programa */}
              <div className="relative">
                <Input2
                  id="nombre"
                  type="text"
                  placeholder="Sistemas"
                  Text="Nombre del programa:"
                  value={formValues.nombre}
                  onChange={handleInputChange}
                  error={errors.nombre}
                />
              </div>

              {/* Campo para el número de ficha */}
              <div className="relative">
                <Input2
                  id="numeroficha"
                  type="text"
                  placeholder="2694265"
                  Text="Número de ficha:"
                  value={formValues.numeroficha}
                  onChange={handleInputChange}
                  error={errors.numeroficha}
                />
              </div>
            </div>

            {successMessage && (
              <div className="text-green-600">
                {successMessage}
              </div>
            )}

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                id="guardarBtn"
                className="bg-Verde text-white px-4 py-2 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registrando...' : 'Agregar'}
              </button>
            </div>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
}

ModalFicha.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddFicha: PropTypes.func.isRequired,
};
