import React, { useState } from 'react';  // Asegúrate de importar useState desde react
import Input from '../../Components/Input.jsx';
import SelectBoxTI from '../../Components/SelectBoxTI.jsx';
import LayoutPrincipal from '../../layouts/LayoutPrincipal.jsx';
import Layoutcontenido3 from '../../Layouts/Layoutcontenido3.jsx';
import BotonPrincipal from '../../Components/BotonPrincipal.jsx';
import ModalPerfil from '../../Components/Modal.jsx';


const EditarPerfil = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipoDocumento: '',
    numeroDoc: '',
    telefono: '',
    correo: '',
    nombreEmpresa: '',
    contraseña: '',
    confiContraseña: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si las contraseñas coinciden
    if (formData.contraseña !== formData.confiContraseña) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Perfil actualizado exitosamente');
        // Aquí puedes redirigir al usuario o limpiar el formulario si es necesario
      } else {
        setError(data.error || 'Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      setError('Error al hacer la solicitud');
    }
  };

  return (
    <LayoutPrincipal title="Editar Perfil">
      <Layoutcontenido3 title="Editar Perfil">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col p-[5%] Flex-box">
            <Input
              placeholder="Nombre completo"
              type="text"
              Text="Nombre completo *"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <SelectBoxTI
              Text="Tipo de documento:"
              value={formData.tipoDocumento}
              onChange={handleChange}
            />
            <Input
              placeholder="Número de documento"
              type="text"
              Text="Número de documento"
              id="numeroDoc"
              value={formData.numeroDoc}
              onChange={handleChange}
            />
            <Input
              placeholder="Teléfono"
              type="text"
              Text="Teléfono *"
              id="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="flex flex-col p-[5%] Flex-box">
            <Input
              placeholder="Correo"
              type="email"
              Text="Correo:"
              id="correo"
              value={formData.correo}
              onChange={handleChange}
            />
            <Input
              type="text"
              Text="Nombre de la Empresa:"
              placeholder="Nombre de la Empresa"
              id="nombreEmpresa"
              value={formData.nombreEmpresa}
              onChange={handleChange}
            />
            <Input
              placeholder="Contraseña"
              type="password"
              Text="Contraseña *"
              id="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
            />
            <Input
              placeholder="Confirmar Contraseña"
              type="password"
              Text="Confirmar Contraseña *"
              id="confiContraseña"
              value={formData.confiContraseña}
              onChange={handleChange}
            />
            <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <div>
                <BotonPrincipal Text="Guardar" onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </div>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}
        <ModalPerfil Text="Perfil actualizado" />
      </Layoutcontenido3>
    </LayoutPrincipal>
  );
};

export default EditarPerfil;