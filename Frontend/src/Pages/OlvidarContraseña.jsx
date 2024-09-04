import React, {  useState, useEffect} from 'react';
import InputField from '../Components/Input.jsx'; // Asegúrate de que esta importación sea correcta
import BotonSegundo from '../Components/BotonSegundo.jsx';
import Img from '../../public/Img/image1.png';
import Img2 from    '../../public/Img/olvidocontraseña.png';

const OlvidarContraseña = () => {


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('');

  useEffect(() => {
    // Limpiar el mensaje de error cuando el usuario escribe en el campo de correo electrónico
    if (email) {
      setMessage('');
      setMessageClass('');
    }
  }, [email]);



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



    <div className=" flex items-center justify-center  h-screen ">
    <div className="  min-h-[60em] w-[100em]  flex column items-center ">
      <div className="bg-white p-8 rounded-lg  w-[40%] h-[40em] mb-[10em] flex flex-col items-center justify-center ">
      <img src={Img} className="w-[25em] " />
        <h2 className="text-[40px] font-bold text-gray-800 text-center mt-[20%]  ">
          Recuperar Contraseña
        </h2>
        <form id="reset-password-form" className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4 w-[20em] mt-[40px] ">
            <InputField
              placeholder="Correo"
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="  h-[100px] flex items-center justify-center mt-[20px] ">
          <BotonSegundo
          Text= "Recuperar "
            type="submit"
           
            />
            </div>
          
          <p id="message" className={`mt-4 text-center ${messageClass}`}>
            {message}
          </p>
        </form>
      </div>
      <div className=" bg-white p-8 rounded-lg shadow-lg w-[60%] h-[70%] ">
        <img src={Img2} className="w-[80em] h-[50%]  " />

      </div>
    </div>
    </div>
  );
};

export default OlvidarContraseña;