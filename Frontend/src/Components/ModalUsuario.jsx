
import PropTypes from 'prop-types';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from './Input2';
import RadioButton from './RadioButton3';
import SelectBoxRol from './SelectBoxRol2';
import SelectBoxTi from './SelectBoxTI2';
import BotonSegundoModal from './BotonSegundoModal';

export default function Usuario({ onClose }) {


  return (
    <>
      <Dialog
        open={true}
        onClose={onClose}
        static={true}
        className="z-[100]"
      >
        <DialogPanel className="w-full max-w-2xl p-6 sm:mx-auto relative">
          <button
            type="button"
            className="absolute right-4 top-4 p-2 bg-transparent border-none text-tremor-content-subtle hover:text-tremor-content hover:bg-tremor-background-subtle dark:text-dark-tremor-content-subtle dark:hover:bg-dark-tremor-background-subtle dark:hover:text-tremor-content"
            onClick={onClose}
            aria-label="Close"
          >
            <RiCloseLine className="size-5" aria-hidden={true} />
          </button>
          <form action="#" method="POST" className="space-y-4">
            <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Añade nuevo usuario
            </h4>
            <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
              Por favor llene todos los datos del usuario
            </p>
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3 space-y-4">
                <Input2
                  id="nombreUsu"
                  type="text"
                  placeholder="Nombre del usuario"
                  Text="Nombre del usuario:"
                />
                <SelectBoxTi
                  id="tipoDoc"
                  text="Tipo de documento" 
                />
                <Input2
                  id="numeroDoc"
                  type="text"
                  placeholder="Numero de documento"
                  Text="Numero de documento:"
                />
                <Input2
                  id="correo"
                  type="email"
                  placeholder="Correo"
                  Text="Correo Electronico:"
                />
              </div>
              <div className="col-span-full sm:col-span-3 space-y-4">
                <Input2
                  id="contrasena"
                  type="password"
                  placeholder="Contraseña"
                  Text="Contraseña:"
                />
                <SelectBoxRol
                  id="tipoRol"
                  text="Seleccione un rol:" 
                />
                <div className="space-y-5">
                  <span className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Selecciona una opción:
                  </span>
                  <div className="space-y-1 flex mt-2">
                    <RadioButton Text="Activo" id="estadoActivo" />
                    <RadioButton Text="Inactivo" id="estadoInactivo" />
                  </div>
                </div>
                <Input2
                  id="celular"
                  type="text"
                  placeholder="Celular"
                  Text="Celular:"
                />
              </div>
            </div>
            <BotonSegundoModal text="Agregar" id="guardarBtn" />
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
}

Usuario.propTypes = {
  onClose: PropTypes.string.isRequired,
};
