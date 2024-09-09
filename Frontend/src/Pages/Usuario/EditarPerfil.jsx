import React, { useState, useEffect } from 'react';
import Input from '../../Components/Input.jsx';
import SelectBoxTI from '../../Components/SelectBoxTI.jsx';
import LayoutPrincipal from '../../layouts/LayoutPrincipal.jsx';
import Layoutcontenido3 from '../../Layouts/Layoutcontenido3.jsx';
import BotonPrincipal from '../../Components/BotonPrincipal.jsx';
import ModalPerfil from '../../Components/Modal.jsx';

const EditarPerfil = () => {
  const [formData, setFormData] = useState({
    idrol: null,
    nombre: '',
    tipodocumento: '',
    numerodocumento: '',
    nombreempresa: '',
    telefono: '',
    correo: '',
    contraseña: '',
    confiContraseña: '',
    estado: true
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Recuperar el rol de usuario de localStorage al cargar el componente
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        idrol: parseInt(userRole, 10), // Convertir el rol a número
      }));
    } else {
      setError('Rol de persona no encontrado. Inicia sesión nuevamente.');
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value, // Actualizar el valor del campo correspondiente
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('ID de rol enviado:', formData.idrol); // Verifica el ID de rol enviado

    if (formData.contraseña !== formData.confiContraseña) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!formData.nombre || !formData.tipodocumento || !formData.numerodocumento || !formData.telefono || !formData.correo || !formData.nombreempresa || !formData.contraseña) {
      setError('Por favor, complete todos los campos obligatorios.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      setError('El formato del correo electrónico es inválido.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError(''); // Limpiar el error en caso de éxito
      } else {
        setError(data.error || 'Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      setError('Error al hacer la solicitud: ' + error.message);
    }
  };
  return (
    <LayoutPrincipal title="Editar Perfil">
      <Layoutcontenido3 title="Editar Perfil">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col p-[5%] Flex-box">
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="Nombre completo"
                type="text"
                Text="Nombre completo *"
                id="nombre" // Coincide con el estado
                value={formData.nombre}
                onChange={handleChange}
              />
              <SelectBoxTI
                Text="Tipo de documento:"
                id="tipodocumento" // Corregido para coincidir con el estado
                value={formData.tipodocumento}
                onChange={handleChange}
              />
              <Input
                placeholder="Número de documento"
                type="text"
                Text="Número de documento"
                id="numerodocumento" // Corregido para coincidir con el estado
                value={formData.numerodocumento}
                onChange={handleChange}
              />
              <Input
                placeholder="Teléfono"
                type="text"
                Text="Teléfono *"
                id="telefono" // Coincide con el estado
                value={formData.telefono}
                onChange={handleChange}
              />
              <Input
                placeholder="Correo"
                type="email"
                Text="Correo:"
                id="correo" // Coincide con el estado
                value={formData.correo}
                onChange={handleChange}
              />
              <Input
                type="text"
                Text="Nombre de la Empresa:"
                placeholder="Nombre de la Empresa"
                id="nombreempresa" // Coincide con el estado
                value={formData.nombreempresa}
                onChange={handleChange}
              />
              <Input
                placeholder="Contraseña"
                type="password"
                Text="Contraseña *"
                id="contraseña" // Coincide con el estado
                value={formData.contraseña}
                onChange={handleChange}
              />
              <Input
                placeholder="Confirmar Contraseña"
                type="password"
                Text="Confirmar Contraseña *"
                id="confiContraseña" // Coincide con el estado
                value={formData.confiContraseña}
                onChange={handleChange}
              />
              <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                <div>
                  <BotonPrincipal type="submit" Text="Guardar" /> {/* Asegúrate de que el botón sea de tipo submit */}
                </div>
              </div>
            </form>
          </div>
        </div>

        {message && <div className="alert alert-success">{message}</div>}
        <div className="alert alert-error">
            {error}
            {/* Puedes descomentar la línea siguiente para ver los detalles del error */}
            {/* <pre>{JSON.stringify(error, null, 2)}</pre> */}
          </div>
        <ModalPerfil Text="Perfil actualizado" />
      </Layoutcontenido3>
    </LayoutPrincipal>
  );
};

export default EditarPerfil;
