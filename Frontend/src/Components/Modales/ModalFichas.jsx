import PropTypes from 'prop-types';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import BotonSegundo from '../BotonSegundoModal';
import RadioButton from '../RadioButton2';
import { useFichaForm } from '../../../hooks/useFichaForm';

const ModalFicha = ({ onClose, onFichaAdded }) => {
  const {
    nombre,
    setNombre,
    numeroFicha,
    setNumeroFicha,
    estado,
    setEstado,
    handleSubmit,
  } = useFichaForm(onFichaAdded);

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
        <form className="space-y-4" onSubmit={handleSubmit}>
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
                  Text="Nombre del programa:"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="relative">
                <Input2
                  id="fichasNum"
                  type="text"
                  placeholder="2694265"
                  Text="Número de ficha:"
                  value={numeroFicha}
                  onChange={(e) => setNumeroFicha(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <span className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Selecciona una opción:
                </span>
                <div className="flex">
                  <RadioButton
                    Text="Activo"
                    id="estadoActivo"
                    checked={estado}
                    onChange={() => setEstado(true)}
                  />
                </div>
              </div>
            </div>
          </div>
          <BotonSegundo text="Agregar" id="guardarBtn" />
        </form>
      </DialogPanel>
    </Dialog>
  );
};

ModalFicha.propTypes = {
  onClose: PropTypes.func.isRequired,
  onFichaAdded: PropTypes.func.isRequired,
};

export default ModalFicha;
