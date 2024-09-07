import { useState } from 'react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from './Input2';
import BotonSegundo from './BotonSegundoModal';
import RadioButton from './RadioButton2';

export default function Area() {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        static={true}
        className="z-[100]"
      >
        <DialogPanel className="sm:max-w-md">
          <form action="#" method="POST" className="space-y-4">
            <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Añade una nueva Area
            </h4>
            <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
              
            </p>
            <div className=" flex flex-col p-[5%] Flex-box space-y-6">
              <div className="col-span-full sm:col-span-3 space-y-4">
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
  );
}
