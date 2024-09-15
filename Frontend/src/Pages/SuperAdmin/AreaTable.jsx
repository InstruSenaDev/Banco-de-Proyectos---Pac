import React, { useEffect, useState } from 'react';
import Layoutprincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido from '../../Layouts/Layoutcontenido5';
import Input2 from '../../Components/Input';
import BotonSegundo from '../../Components/BotonSegundo';
import Loader from '../../Components/Loader';
import { useNavigate } from 'react-router-dom';
import { CalloutA } from '../../Components/Callout'; // Asegúrate de que la ruta es correcta

const RegistroProyecto = () => {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [inputsTipoArea, setInputsTipoArea] = useState([{ id: 1, value: '' }]);
  const [inputsObjetivos, setInputsObjetivos] = useState([{ id: 1, value: '' }]);
  const [inputsAlcance, setInputsAlcance] = useState([{ id: 1, value: '' }]);
  const navigate = useNavigate();

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

  const handleInputChange = (index, event, setInputs, inputs) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
  };

  return (
    <Layoutprincipal>
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <>
        <div className="flex justify-end items-end w-full">
              <div className="w-full max-w-2xl p-5">
                <CalloutA variant="default" title="Nota">
                  Completa los siguientes pasos para registrar completo del proyecto.
                </CalloutA>
              </div>
            </div>
          <Layoutcontenido title="Crear Registro">
          
            <button
              onClick={handleGoBack}
              className="self-start text-black hover:text-Verde"
            >
              <i className="fas fa-arrow-left w-5 h-5 mr-2"></i>
              Volver
            </button>
           
            <div className="w-full md:w-1/2">
              <div className="flex flex-col p-[5%] space-y-5">
                {step === 1 && (
                  <div>
                    <Input2
                      id="area"
                      Text="Área"
                      type="text"
                      placeholder="Ingrese Área"
                    />

                    {inputsTipoArea.map((input, index) => (
                      <div key={input.id} className="space-y-2">
                        <Input2
                          id={`tipoArea-${input.id}`}
                          Text={`Tipo de Área ${input.id}`}
                          type="text"
                          placeholder="Ingrese Tipo de Área"
                          value={input.value}
                          onChange={(e) =>
                            handleInputChange(index, e, setInputsTipoArea, inputsTipoArea)
                          }
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
                  <div>
                  <Input2
                      id="Categoria Objetivos"
                      Text="Ingrese Categoria "
                      type="text"
                      placeholder="Ingrese Área"
                    />

                    {inputsObjetivos.map((input, index) => (
                      <div key={input.id} className="space-y-2">
                        <Input2
                          id={`objetivo-${input.id}`}
                          Text={`Objetivo ${input.id}`}
                          type="text"
                          placeholder="Ingrese Objetivo"
                          value={input.value}
                          onChange={(e) =>
                            handleInputChange(index, e, setInputsObjetivos, inputsObjetivos)
                          }
                        />
                        {index === inputsObjetivos.length - 1 && inputsObjetivos.length < 5 && (
                          <div className="flex justify-end">
                            <span
                              className="text-sm text-blue-500 underline cursor-pointer"
                              onClick={() => handleAddInput(setInputsObjetivos, inputsObjetivos)}
                            >
                              + Añadir más
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {step === 3 && (
                  <div>
                  <Input2
                      id="Categoria Alcance"
                      Text="Ingrese Categoria "
                      type="text"
                      placeholder="Ingrese Área"
                    />

                    {inputsAlcance.map((input, index) => (
                      <div key={input.id} className="space-y-2">
                        <Input2
                          id={`alcance-${input.id}`}
                          Text={`Alcance ${input.id}`}
                          type="text"
                          placeholder="Ingrese Alcance"
                          value={input.value}
                          onChange={(e) =>
                            handleInputChange(index, e, setInputsAlcance, inputsAlcance)
                          }
                        />
                        {index === inputsAlcance.length - 1 && inputsAlcance.length < 5 && (
                          <div className="flex justify-end">
                            <span
                              className="text-sm text-blue-500 underline cursor-pointer"
                              onClick={() => handleAddInput(setInputsAlcance, inputsAlcance)}
                            >
                              + Añadir más
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-5">
                {step > 1 && (
                  <BotonSegundo Text="Anterior" onClick={() => setStep(step - 1)} />
                )}
                {step < 3 ? (
                  <BotonSegundo Text="Siguiente" onClick={() => setStep(step + 1)} />
                ) : (
                  <BotonSegundo Text="Finalizar" onClick={() => alert('Formulario completo')} />
                )}
              </div>
            </div>
          </Layoutcontenido>
        </>
      )}
    </Layoutprincipal>
  );
};

export default RegistroProyecto;
