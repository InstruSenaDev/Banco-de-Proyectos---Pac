import React, { useState } from 'react';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from './Input2'; // Asegúrate de que la ruta de importación sea correcta
import BotonSegundo from './BotonSegundoModal'; // Asegúrate de que la ruta de importación sea correcta
import RadioButton from './RadioButton'; // Asegúrate de que la ruta de importación sea correcta
import SelectBoxRol from './SelectBoxRol'; // Asegúrate de que la ruta de importación sea correcta
import SelectBoxTi from './SelectBoxTI'; // Asegúrate de que la ruta de importación sea correcta

export default function Area() {
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
        <DialogPanel className="sm:max-w-md">
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
              Añade una nueva Area
            </h4>
            <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
              
            </p>
            <div class=" flex flex-col p-[5%] Flex-box space-y-6">
              <div class="col-span-full sm:col-span-3 space-y-4">
                <div>
                  <Input2
                    id="nombreArea"
                    type="text"
                    placeholder="Area"
                    Text="Area:"
                  />
                </div>

                <div>
                  <div className="space-y-5">
                    <span className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Selecciona una opción:
                    </span>
                    <div className="flex mt-2">
                      <RadioButton Text="Activo" id="estadoActivo" />
                      <RadioButton Text="Inactivo" id="estadoInactivo" />
                    </div>
                  </div>
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
