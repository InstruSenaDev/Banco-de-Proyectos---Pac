import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import { useFichaForm } from '../../../hooks/SuperAdmin/useFichaForm';

export default function ModalFicha({ onClose, onAddFicha }) {
  const [successMessage, setSuccessMessage] = useState('');

  const handleSuccess = useCallback((data) => {
    onAddFicha(data);
    setSuccessMessage('Registro exitoso');
    setTimeout(() => {
      onClose();
    }, 2000);
  }, [onAddFicha, onClose]);

  const { formValues, errors, handleInputChange, handleSubmit, isSubmitting } = useFichaForm(handleSuccess);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    if (!isSubmitting) handleSubmit(e);
  }, [handleSubmit, isSubmitting]);

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
          </div>

          {successMessage && (
            <div className="mt-4 text-green-600">
              {successMessage}
            </div>
          )}

          <div className='flex justify-end mt-8'>
            <button
              type="submit"
              id="guardarBtn"
              className="bg-Verde text-white px-4 py-2 rounded justify-end"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registrando...' : 'Agregar'}
            </button>
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