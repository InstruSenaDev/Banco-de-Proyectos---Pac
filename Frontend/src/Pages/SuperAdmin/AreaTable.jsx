import React, { useEffect, useState } from 'react';
import Layoutprincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido from '../../Layouts/Layoutcontenido5';
import Input2 from '../../Components/Input';
import BotonSegundo from '../../Components/BotonSegundo';
import Loader from '../../Components/Loader';
import { useNavigate } from 'react-router-dom';
import { CalloutA } from '../../Components/Callout';
import { ModalR } from '../../Components/ModalR';
import useValidation from '../../../hooks/useRegistroC'; // Importa el hook

const RegistroProyecto = () => {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [inputsTipoArea, setInputsTipoArea] = useState([{ id: 1, value: '' }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    area: '',
    categoriaObjetivos: '',
    categoriaAlcance: '',
    ...inputsTipoArea.reduce((acc, input) => ({ ...acc, [`tipoArea-${input.id}`]: '' }), {})
  };

  const {
    values,
    errors,
    handleInputChange,
    validateAll,
    resetValues,
  } = useValidation(initialValues);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard');
  };

  const handleAddInput = (setInputs, inputs) => {
    if (inputs.length < 5) {
      setInputs((prevInputs) => [
        ...prevInputs,
        { id: prevInputs.length + 1, value: '' },
      ]);
    }
  };

  const handleFinalize = () => {
    if (validateAll()) {
      setIsModalOpen(true); // Si todos los campos son válidos, abre el modal
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStep(1);
    resetValues(); // Resetea los valores cuando cierras el modal
  };

  return (
    <Layoutprincipal>
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-between px-4">
            <button
              onClick={handleGoBack}
              className="self-start text-black hover:text-Verde"
            >
              <i className="fas fa-arrow-left w-5 h-5 mr-2"></i>
              Volver
            </button>
          </div>
          <div className="flex justify-end items-end w-full">
            <div className="w-full max-w-2xl p-5">
              <CalloutA variant="default" title="Nota">
                Completa los siguientes pasos para registrar el proyecto.
              </CalloutA>
            </div>
          </div>
          <Layoutcontenido title="Crear Registro">
            <div className="w-full md:w-1/2">
              <div className="flex flex-col p-[5%] space-y-5">
                {step === 1 && (
                  <div className="space-y-4">
                    <Input2
                      id="area"
                      Text="Área"
                      type="text"
                      placeholder="Ingrese Área"
                      value={values.area}
                      onChange={handleInputChange}
                      error={errors.area}
                    />
                    {inputsTipoArea.map((input, index) => (
                      <div key={input.id} className="space-y-2">
                        <Input2
                          id={`tipoArea-${input.id}`}
                          Text={`Tipo de Área ${input.id}`}
                          type="text"
                          placeholder="Ingrese Tipo de Área"
                          value={values[`tipoArea-${input.id}`]}
                          onChange={handleInputChange}
                          error={errors[`tipoArea-${input.id}`]}
                        />
                        {index === inputsTipoArea.length - 1 && inputsTipoArea.length < 5 && (
                          <div className="flex justify-end">
                            <span
                              className="text-sm text-blue-500 underline cursor-pointer"
                              onClick={() => handleAddInput(setInputsTipoArea, inputsTipoArea)}
                            >
                              + Añadir más
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <Input2
                      id="categoriaObjetivos"
                      Text="Ingrese Categoria"
                      type="text"
                      placeholder="Ingrese Objetivo"
                      value={values.categoriaObjetivos}
                      onChange={handleInputChange}
                      error={errors.categoriaObjetivos}
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <Input2
                      id="categoriaAlcance"
                      Text="Ingrese Categoria"
                      type="text"
                      placeholder="Ingrese Alcance"
                      value={values.categoriaAlcance}
                      onChange={handleInputChange}
                      error={errors.categoriaAlcance}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-2 px-9">
                {step > 1 && (
                  <BotonSegundo Text="Anterior" onClick={() => setStep(step - 1)} />
                )}
                {step < 3 ? (
                  <BotonSegundo Text="Siguiente" onClick={() => setStep(step + 1)} />
                ) : (
                  <BotonSegundo Text="Finalizar" onClick={handleFinalize} />
                )}
              </div>
            </div>
          </Layoutcontenido>
          <ModalR isOpen={isModalOpen} closeDialog={closeModal} />
        </>
      )}
    </Layoutprincipal>
  );
};

export default RegistroProyecto;
