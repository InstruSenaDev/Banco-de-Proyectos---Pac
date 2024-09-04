import React, { useState } from 'react';
import InputField from '../Components/Input.jsx'; // Asegúrate de que esta importación sea correcta

import '../../public/Img/image1.png';
import '../../public/Img/olvidocontraseña.png';

const OlvidarContraseña = () => {


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Email:", email); // Verifica el valor del correo

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage('Introduce un correo electrónico válido.');
      setMessageClass('text-red-500');
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      console.log("Response:", result); // Verifica la respuesta del servidor

      if (response.ok) {
        setMessage('El enlace de restablecimiento fue enviado a tu correo.');
        setMessageClass('text-green-500');
      } else {
        setMessage(result.error || 'Por favor regístrate para hacer el cambio de contraseña.');
        setMessageClass('text-red-500');
      }
    } catch (error) {
      setMessage('Error al enviar el enlace de restablecimiento.');
      setMessageClass('text-red-500');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Recuperar Contraseña
        </h2>
        <form id="reset-password-form" className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputField
              placeholder="Introduce tu correo electrónico"
              type="email"
              Text="Correo Electrónico"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg"
          >
            Enviar enlace de recuperación
          </button>
          <p id="message" className={`mt-4 text-center ${messageClass}`}>
            {message}
          </p>
        </form>
      </div>
    </div>
  );
};

export default OlvidarContraseña;