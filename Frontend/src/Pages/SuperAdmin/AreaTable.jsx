'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layoutprincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido5 from '../../Layouts/Layoutcontenido5';
import Input2 from '../../Components/Input'; // Ajusta la ruta si es necesario
import { CalloutA } from '../../Components/Callout'; // Ajusta la ruta si es necesario
import BotonSegundo from '../../Components/BotonSegundo';
import Loader from '../../Components/Loader'; // Ajusta la ruta si es necesario

export default function Example() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
  });

  // Estados para los campos dinámicos
  const [areas, setAreas] = useState(['']);
  const [items, setItems] = useState(['']);
  const [objectives, setObjectives] = useState(['']);
  const [scopes, setScopes] = useState(['']);

  // Estados para las nuevas categorías
  const [categoryObjectives, setCategoryObjectives] = useState('');
  const [categoryScopes, setCategoryScopes] = useState('');

  const [errors, setErrors] = useState({});

  // Función genérica para manejar cambios en el input
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Función para manejar cambios en los inputs dinámicos
  const handleDynamicChange = (setter) => (index) => (e) => {
    const { value } = e.target;
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  // Función para agregar un nuevo input con límite
  const addInput = (setter, currentArray) => () => {
    if (currentArray.length < 5) {
      setter((prev) => [...prev, '']);
    }
  };

  // Función para validar el formulario
  const validateForm = () => {
    const newErrors = {};

    // Validar campos principales
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'Este campo es obligatorio';
      }
    });

    // Validar categoría de objetivos
    if (!categoryObjectives) {
      newErrors.categoryObjectives = 'Este campo es obligatorio';
    }

    // Validar categoría de alcance
    if (!categoryScopes) {
      newErrors.categoryScopes = 'Este campo es obligatorio';
    }

    // Validar campos dinámicos
    if (areas.some(area => !area || !/\d/.test(area))) {
      areas.forEach((area, index) => {
        if (!area) {
          newErrors[`area${index}`] = 'Este campo es obligatorio';
        } else if (!/\d/.test(area)) {
          newErrors[`area${index}`] = 'Debe contener al menos un número';
        }
      });
    }

    // Validar que todos los inputs de items, objetivos y alcances tengan valor
    items.forEach((item, index) => {
      if (!item) {
        newErrors[`item${index}`] = 'Este campo es obligatorio';
      }
    });

    objectives.forEach((objective, index) => {
      if (!objective) {
        newErrors[`objective${index}`] = 'Este campo es obligatorio';
      }
    });

    scopes.forEach((scope, index) => {
      if (!scope) {
        newErrors[`scope${index}`] = 'Este campo es obligatorio';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Funciones para enviar datos a las API
  const sendAreas = async () => {
    try {
      const response = await fetch('/api/areas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ areas }),
      });
      if (!response.ok) throw new Error('Error al registrar áreas');
    } catch (error) {
      console.error(error);
      // Manejar errores
    }
  };

  const sendItems = async () => {
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });
      if (!response.ok) throw new Error('Error al registrar ítems');
    } catch (error) {
      console.error(error);
      // Manejar errores
    }
  };

  const sendObjectives = async () => {
    try {
      const response = await fetch('/api/objectives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryObjectives, objectives }),
      });
      if (!response.ok) throw new Error('Error al registrar objetivos');
    } catch (error) {
      console.error(error);
      // Manejar errores
    }
  };

  const sendScopes = async () => {
    try {
      const response = await fetch('/api/scopes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryScopes, scopes }),
      });
      if (!response.ok) throw new Error('Error al registrar alcances');
    } catch (error) {
      console.error(error);
      // Manejar errores
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Enviar datos a sus respectivas tablas
      await sendAreas();
      await sendItems();
      await sendObjectives();
      await sendScopes();
      // Aquí puedes manejar la redirección o mostrar un mensaje de éxito
      console.log('Formulario válido. Datos enviados con éxito.');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard'); // Redirigir al dashboard
  };

  return (
    <Layoutprincipal title="Registro proyecto">
      {/* Alerta centrada en la página */}
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
        <div className="flex px-80 mb-4">
            <button
              onClick={handleGoBack}
              className="flex items-center text-black hover:text-Verde ml-4" // Ajusta el margen izquierdo aquí
            >
              <i className="fas fa-arrow-left w-5 h-5 mr-2"></i>
              Volver
            </button>
          </div>
          <Layoutcontenido5 title="Registro completo">
            <div className="sm:mx-auto sm:max-w-x5">
              <form onSubmit={handleSubmit} className="mt-8">
                {/* Parte Superior: Áreas, Tipos de Áreas, e Ítems */}
                <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2">
                  <div className="col-span-1">
                    <Input2
                      placeholder="Área"
                      type="text"
                      Text="Área"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={errors.firstName}
                    />
                  </div>
                  {/* Tipo de área */}
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Tipo de área</label>
                    {areas.map((area, index) => (
                      <div key={index} className="mb-2">
                        <Input2
                          placeholder={`Tipo de área ${index + 1}`}
                          type="text"
                          value={area}
                          onChange={handleDynamicChange(setAreas)(index)}
                          error={errors[`area${index}`]}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className={`text-tremor-brand hover:underline text-sm ${areas.length >= 5 ? 'text-gray-400 cursor-not-allowed' : ''}`}
                      onClick={addInput(setAreas, areas)}
                      disabled={areas.length >= 5}
                    >
                      + Agregar otra área
                    </button>
                  </div>
                  {/* Items */}
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Items</label>
                    {items.map((item, index) => (
                      <div key={index} className="mb-2">
                        <Input2
                          placeholder={`Item ${index + 1}`}
                          type="text"
                          value={item}
                          onChange={handleDynamicChange(setItems)(index)}
                          error={errors[`item${index}`]}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className={`text-tremor-brand hover:underline text-sm ${items.length >= 5 ? 'text-gray-400 cursor-not-allowed' : ''}`}
                      onClick={addInput(setItems, items)}
                      disabled={items.length >= 5}
                    >
                      + Agregar otro item
                    </button>
                  </div>
                </div>

                {/* Divisor */}
                <div className="my-8 border-t border-gray-300"></div>

                {/* Parte Inferior: Categorías de Objetivos y Alcance */}
                <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2">
                  {/* Categoría Objetivos */}
                  <div className="col-span-1">
                    <Input2
                      placeholder="Categoría Objetivos"
                      type="text"
                      Text="Categoría Objetivos"
                      id="categoryObjectives"
                      value={categoryObjectives}
                      onChange={(e) => setCategoryObjectives(e.target.value)}
                      error={errors.categoryObjectives}
                    />
                  </div>
                  {/* Objetivos */}
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Objetivos</label>
                    {objectives.map((objective, index) => (
                      <div key={index} className="mb-2">
                        <Input2
                          placeholder={`Objetivo ${index + 1}`}
                          type="text"
                          value={objective}
                          onChange={handleDynamicChange(setObjectives)(index)}
                          error={errors[`objective${index}`]}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className={`text-tremor-brand hover:underline text-sm ${objectives.length >= 5 ? 'text-gray-400 cursor-not-allowed' : ''}`}
                      onClick={addInput(setObjectives, objectives)}
                      disabled={objectives.length >= 5}
                    >
                      + Agregar otro objetivo
                    </button>
                  </div>
                  {/* Categoría Alcance */}
                  <div className="col-span-1">
                    <Input2
                      placeholder="Categoría Alcance"
                      type="text"
                      Text="Categoría Alcance"
                      id="categoryScopes"
                      value={categoryScopes}
                      onChange={(e) => setCategoryScopes(e.target.value)}
                      error={errors.categoryScopes}
                    />
                  </div>
                  {/* Alcance */}
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Alcance</label>
                    {scopes.map((scope, index) => (
                      <div key={index} className="mb-2">
                        <Input2
                          placeholder={`Alcance ${index + 1}`}
                          type="text"
                          value={scope}
                          onChange={handleDynamicChange(setScopes)(index)}
                          error={errors[`scope${index}`]}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className={`text-tremor-brand hover:underline text-sm ${scopes.length >= 5 ? 'text-gray-400 cursor-not-allowed' : ''}`}
                      onClick={addInput(setScopes, scopes)}
                      disabled={scopes.length >= 5}
                    >
                      + Agregar otro alcance
                    </button>
                  </div>
                </div>
              </form>
              {/* Botón personalizado al final */}
              <div className="mt-8">
                <BotonSegundo Text="Registrar Todo" onClick={handleSubmit} />
              </div>
            </div>
          </Layoutcontenido5>
        </>
      )}
    </Layoutprincipal>
  );
}
