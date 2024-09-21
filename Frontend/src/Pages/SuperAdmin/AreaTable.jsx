import { useState, useEffect } from 'react';
import Layoutprincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido5 from '../../Layouts/Layoutcontenido5';
import Input2 from '../../Components/Input'; // Ajusta la ruta si es necesario
import { CalloutA } from '../../Components/Callout'; // Ajusta la ruta si es necesario
import BotonSegundo from '../../Components/BotonSegundo';
import Loader from '../../Components/Loader'; // Ajusta la ruta si es necesario
import axios from 'axios'; // Añadido para las llamadas a la API

export default function Example() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    area: '',
    categoryObjectives: '',
    categoryScopes: '',
  });

  const [areas, setAreas] = useState(['']);
  const [items, setItems] = useState(['']);
  const [objectives, setObjectives] = useState(['']);
  const [scopes, setScopes] = useState(['']);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  const handleDynamicChange = (setState, index, event) => {
    setState(prevState => {
      const newState = [...prevState];
      newState[index] = event.target.value;
      return newState;
    });
  };

  const addInput = (setState, state) => {
    setState([...state, '']);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Llamada para iniciar la transacción
      await axios.post('http://localhost:4000/api/startTransaction');


      // Guardar área
      if (formData.area) {
        await axios.post('http://localhost:4000/api/registerArea', { area: formData.area });
      }

      // Guardar categorías de objetivos
      if (formData.categoryObjectives) {
        await axios.post('http://localhost:4000/api/categoriasobjetivos', { nombre: formData.categoryObjectives });
      }

      // Guardar categorías de alcance
      if (formData.categoryScopes) {
        await axios.post('http://localhost:4000/api/categoriasalcance', { nombre: formData.categoryScopes });
      }

      // Guardar tipos de áreas
      for (const area of areas) {
        if (area) {
          await axios.post('http://localhost:4000/api/tipos-de-area', { descripcion: area });
        }
      }

      // Guardar objetivos
      for (const objective of objectives) {
        if (objective) {
          await axios.post('http://localhost:4000/api/objetivos', { descripcion: objective });
        }
      }

      // Guardar alcances
      for (const scope of scopes) {
        if (scope) {
          await axios.post('http://localhost:4000/api/alcance', { descripcion: scope });
        }
      }

      // Guardar items
      for (const item of items) {
        if (item) {
          await axios.post('http://localhost:4000/api/insertItem', { tipoArea: formData.area, itemName: item });
        }
      }

      // Esperar a que se completen todas las promesas
      await Promise.all(handleSubmit.filter(Boolean));

       // Llamada para confirmar la transacción
       await axios.post('http://localhost:4000/api/commitTransaction');
       alert('Datos guardados correctamente');
     } catch (error) {
       console.error('Error al guardar los datos:', error.response ? error.response.data : error.message);
       try {
         // Llamada para deshacer la transacción en caso de error
         await axios.post('http://localhost:4000/api/rollbackTransaction');
         console.log('Transacción revertida correctamente');
       } catch (rollbackError) {
         console.error('Error al revertir la transacción:', rollbackError);
       }
       alert('Hubo un error al guardar los datos. La transacción fue revertida.');
     }
   };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layoutprincipal title="Registro proyecto">
      <div className="flex justify-center items-center my-4">
        <CalloutA variant="warning" title="Important Notice">
          POR FAVOR LLENE TODOS LOS DATOS PARA REALIZAR UN REGISTRO COMPLETO
        </CalloutA>
      </div>
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <>
        <Layoutcontenido5 title="Registro completo">
              <div className="sm:mx-auto sm:max-w-x5">
                <form className="mt-8" onSubmit={handleSubmit}>
                  {/* Sección de Áreas */}
                  <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2">
                    <div className="col-span-1">
                      <Input2
                        placeholder="Área"
                        type="text"
                        Text="Área"
                        id="area"
                        value={formData.area}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">Tipo de área</label>
                      {areas.map((area, index) => (
                        <div key={index} className="mb-2">
                          <Input2
                            placeholder={`Tipo de área ${index + 1}`}
                            type="text"
                            value={area}
                            onChange={(e) => handleDynamicChange(setAreas, index, e)}
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        className={`text-tremor-brand hover:underline text-sm ${areas.length >= 5 ? 'text-gray-400 cursor-not-allowed' : ''}`}
                        onClick={() => addInput(setAreas, areas)}
                        disabled={areas.length >= 5}
                      >
                        + Agregar otra área
                      </button>
                    </div>

                    {/* Sección de Items */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">Items</label>
                      {items.map((item, index) => (
                        <div key={index} className="mb-2">
                          <Input2
                            placeholder={`Item ${index + 1}`}
                            type="text"
                            value={item}
                            onChange={(e) => handleDynamicChange(setItems, index, e)}
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        className={`text-tremor-brand hover:underline text-sm ${items.length >= 5 ? 'text-gray-400 cursor-not-allowed' : ''}`}
                        onClick={() => addInput(setItems, items)}
                        disabled={items.length >= 5}
                      >
                        + Agregar otro item
                      </button>
                    </div>
                  </div>

                  <div className="my-8 border-t border-gray-300"></div>

                  {/* Sección de Objetivos y Alcances */}
                  <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2">
                    <div className="col-span-1">
                      <Input2
                        placeholder="Categoría Objetivos"
                        type="text"
                        Text="Categoría Objetivos"
                        id="categoryObjectives"
                        value={formData.categoryObjectives}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">Objetivos</label>
                      {objectives.map((objective, index) => (
                        <div key={index} className="mb-2">
                          <Input2
                            placeholder={`Objetivo ${index + 1}`}
                            type="text"
                            value={objective}
                            onChange={(e) => handleDynamicChange(setObjectives, index, e)}
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        className={`text-tremor-brand hover:underline text-sm ${objectives.length >= 5 ? 'text-gray-400 cursor-not-allowed' : ''}`}
                        onClick={() => addInput(setObjectives, objectives)}
                        disabled={objectives.length >= 5}
                      >
                        + Agregar otro objetivo
                      </button>
                    </div>

                    <div className="col-span-1">
                      <Input2
                        placeholder="Categoría Alcance"
                        type="text"
                        Text="Categoría Alcance"
                        id="categoryScopes"
                        value={formData.categoryScopes}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">Alcance</label>
                      {scopes.map((scope, index) => (
                        <div key={index} className="mb-2">
                          <Input2
                            placeholder={`Alcance ${index + 1}`}
                            type="text"
                            value={scope}
                            onChange={(e) => handleDynamicChange(setScopes, index, e)}
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        className={`text-tremor-brand hover:underline text-sm ${scopes.length >= 5 ? 'text-gray-400 cursor-not-allowed' : ''}`}
                        onClick={() => addInput(setScopes, scopes)}
                        disabled={scopes.length >= 5}
                      >
                        + Agregar otro alcance
                      </button>
                    </div>
                  </div>

                  <div className="mt-12">
                    <BotonSegundo
                      type="submit"
                      id="submitButton"
                      text="Registrar"
                      onClick={handleSubmit}
                    />
                  </div>
                </form>
              </div>
        </Layoutcontenido5>
        </>
      )}
    </Layoutprincipal>
  );
};

