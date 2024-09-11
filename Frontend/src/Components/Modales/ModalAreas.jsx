import React from 'react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import BotonSegundo from '../BotonSegundoModal';
import PropTypes from 'prop-types';


const Areas = ({ onClose, onAddMember }) => {
  const { areaName,  setAreaName, handleSubmit } = useAreaForm(onAddMember, onClose);

  return (
    <Dialog open={true} onClose={onClose} static={true} className="z-[100]">
      <DialogPanel className="sm:max-w-md">
        <button
          type="button"
          className="absolute right-4 top-4 p-2 bg-transparent border-none text-tremor-content-subtle hover:text-tremor-content hover:bg-tremor-background-subtle dark:text-dark-tremor-content-subtle dark:hover:bg-dark-tremor-background-subtle dark:hover:text-tremor-content"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="fas fa-times size-5" aria-hidden={true}></i>
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Añade una nueva Área
          </h4>

          <div className="relative flex flex-col p-[5%] Flex-box space-y-6">
            <Input2
              id="nombreArea"
              type="text"
              placeholder="Nombre del Área"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              Text="Área:"
              className="pr-10"
            />
          </div>

          <BotonSegundo text="Agregar" id="guardarBtn" />
        </form>
      </DialogPanel>
    </Dialog>
  );
};

Areas.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddMember: PropTypes.func.isRequired,
};

export default Areas;
