import PropTypes from 'prop-types';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import RadioButton3 from '../RadioButton3';
import { useFichaForm } from '../../../hooks/SuperAdmin/useFichaForm';
import { useState } from 'react';

export default function ModalFicha({ onClose, onAddFicha }) {
  const { formValues, errors, handleInputChange, handleSubmit } = useFichaForm(); // No se pasa el callback aquí
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío

  // Función de envío personalizada para controlar el estado de envío
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (isSubmitting) return; // Evita enviar varias veces
  
    setIsSubmitting(true); // Desactiva el botón
  
    const isValid = await handleSubmit(e); // Llama al envío del formulario y espera la validación
  
    if (isValid) {
      onAddFicha(formValues); // Agrega la ficha solo si el formulario es válido
      onClose(); // Cierra el modal solo después de agregar la ficha
    }
  
    setIsSubmitting(false); // Reactiva el botón después del envío
  };
  
  return (
    <Dialog
      open={true}
      onClose={onClose}
      static={true}
      className="z-[100]"
    >
      <DialogPanel className="w-full max-w-2xl p-6 sm:mx-auto relative">
        <button
          type="button"
          className="absolute right-4 top-4 p-2 bg-transparent border-none"
          onClick={onClose}
          aria-label="Close"
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
              <div className="space-y-4">
                <div className="flex">
                  <RadioButton3
                    Text="Activo"
                    Text2="Inactivo"
                    id="estadoActivo"
                    value="Activo"
                    checked={formValues.estado === true}
                    onChange={() => handleInputChange({ target: { id: 'estado', value: true } })}
                    error={errors.estado}
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            id="guardarBtn"
            className="bg-Verde text-black px-4 py-2 rounded flex justify-start"
            disabled={isSubmitting} // Desactiva el botón si está enviando
          >
            {isSubmitting ? '' : 'Agregar'}
          </button>
        </form>
      </DialogPanel>
    </Dialog>
  );
}

ModalFicha.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddFicha: PropTypes.func.isRequired,
};
