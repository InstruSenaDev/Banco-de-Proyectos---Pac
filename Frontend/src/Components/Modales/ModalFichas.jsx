import { useState } from 'react';
import PropTypes from 'prop-types';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import BotonSegundo from '../BotonSegundoModal';

const ModalFicha = ({ onClose }) => {
  const [nombreFicha, setNombreFicha] = useState('');
  const [fichasNum, setFichasNum] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validar Nombre de la ficha (solo letras, entre 2 y 50 caracteres)
    if (!nombreFicha.trim()) {
      formErrors.nombreFicha = 'El nombre de la ficha es obligatorio.';
      isValid = false;
    } else if (!/^[A-Za-z\s]{2,50}$/.test(nombreFicha.trim())) {
      formErrors.nombreFicha = 'El nombre debe contener solo letras y tener entre 2 y 50 caracteres.';
      isValid = false;
    }

    // Validar Número de ficha (solo números, longitud exacta de 7 dígitos)
    if (!fichasNum.trim()) {
      formErrors.fichasNum = 'El número de ficha es obligatorio.';
      isValid = false;
    } else if (!/^[0-9]{7}$/.test(fichasNum.trim())) {
      formErrors.fichasNum = 'El número de ficha debe contener exactamente 7 dígitos.';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      const formData = {
        nombre: nombreFicha.trim(),
        numeroFicha: fichasNum.trim(),
        estado: true,
      };

      fetch('http://localhost:4000/api/registerFicha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(`Error: ${error.error || 'Unknown error'}`);
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log('Ficha registrada con éxito:', data);
          onClose();
        })
        .catch((error) => {
          console.error('Error al registrar ficha:', error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    // Limpiar el error específico cuando el usuario comienza a escribir
    setErrors(prev => ({ ...prev, [e.target.id]: '' }));
  };

  return (
    <Dialog open={true} onClose={onClose} static={true} className="z-[100]">
      <DialogPanel className="sm:max-w-md">
        <button
          type="button"
          className="absolute right-4 top-4 p-2 bg-transparent border-none text-tremor-content-subtle hover:text-tremor-content hover:bg-tremor-background-subtle dark:text-dark-tremor-content-subtle dark:hover:bg-dark-tremor-background-subtle dark:hover:text-tremor-content"
          onClick={onClose}
          aria-label="Close"
        >
          <RiCloseLine className="size-5" aria-hidden={true} />
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Añade nueva ficha
          </h4>
          <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Por favor llene todos los campos 
          </p>
          <div className="flex flex-col p-[5%] space-y-4">
            <div className="col-span-full sm:col-span-3 space-y-2">
              <div className="relative">
                <Input2
                  id="nombreFicha"
                  type="text"
                  placeholder="Sistemas"
                  value={nombreFicha}
                  onChange={handleInputChange(setNombreFicha)}
                  Text="Nombre del programa:"
                />
                {errors.nombreFicha && <p className="error-message text-red-500 text-sm">{errors.nombreFicha}</p>}
              </div>

              <div className="relative">
                <Input2
                  id="fichasNum"
                  type="text"
                  placeholder="2694265"
                  value={fichasNum}
                  onChange={handleInputChange(setFichasNum)}
                  Text="Número de ficha:"
                />
                {errors.fichasNum && <p className="error-message text-red-500 text-sm">{errors.fichasNum}</p>}
              </div>
            </div>
          </div>
          <BotonSegundo text="Agregar" id="guardarBtn" disabled={isSubmitting} />
        </form>
      </DialogPanel>
    </Dialog>
  );
};

ModalFicha.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalFicha;