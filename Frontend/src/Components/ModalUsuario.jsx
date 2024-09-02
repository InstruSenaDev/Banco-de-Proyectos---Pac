import React, { useState } from 'react';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '..Components/Input2'; // Asegúrate de que la ruta de importación sea correcta
import BotonSegundo from '..Components/BotonSegundoModal'; // Asegúrate de que la ruta de importación sea correcta
import RadioButton from '..Components/RadioButton'; // Asegúrate de que la ruta de importación sea correcta
import SelectBoxRol from '..Components/SelectBoxRol'; // Asegúrate de que la ruta de importación sea correcta
import SelectBoxTi from '..Components/SelectBoxTI'; // Asegúrate de que la ruta de importación sea correcta

export default function Usuario() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center py-36">
        <button
          type="button"
          className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2 text-center text-tremor-default font-medium bg-tremor-background-emphasis text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
          onClick={() => setIsOpen(true)}
        >
          Show Dialog
        </button>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        static={true}
        className="z-[100]"
      >
        <DialogPanel className="w-full max-w-2xl p-6 sm:mx-auto relative">
          <button
            type="button"
            className="absolute right-4 top-4 p-2 bg-transparent border-none text-tremor-content-subtle hover:text-tremor-content hover:bg-tremor-background-subtle dark:text-dark-tremor-content-subtle dark:hover:bg-dark-tremor-background-subtle dark:hover:text-tremor-content"
            onClick={() => setIsOpen(false)}
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
                <div>
                  <Input2
                    id="nombreUsu"
                    type="text"
                    placeholder="Nombre del usuario"
                    Text="Nombre del usuario:"
                  />
                </div>

                <div>
                  <SelectBoxTi
                    id="tipoDoc"
                    text="Tipo de documento" />
                </div>

                <div>
                  <Input2
                    id="numeroDoc"
                    type="text"
                    placeholder="Numero de documento"
                    Text="Numero de documento:"
                  />
                </div>

                <div>
                  <Input2
                    id="correo"
                    type="email"
                    placeholder="Correo"
                    Text="Correo Electronico:"
                  />
                </div>
              </div>

              <div className="col-span-full sm:col-span-3 space-y-4">
                <div>
                  <Input2
                    id="contrasena"
                    type="password"
                    placeholder="Contraseña"
                    Text="Contraseña:"
                  />
                </div>

                <div>
                  <SelectBoxRol
                    id="tipoRol"
                    text="Seleccione un rol:" />
                </div>

                <div>
                  <div className="space-y-5">
                    <span className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Selecciona una opción:
                    </span>
                    <div className="space-y-1 flex mt-2">
                      <RadioButton Text="Activo" id="estadoActivo" />
                      <RadioButton Text="Inactivo" id="estadoInactivo" />
                    </div>
                  </div>
                </div>

                <div>
                  <Input2
                    id="celular"
                    type="text"
                    placeholder="Celular"
                    Text="Celular:"
                  />
                </div>
              </div>
            </div>
            <BotonSegundo text="Agregar" id="guardarBtn" />
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
}
