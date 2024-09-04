import React, { useState, useEffect } from 'react';
import Input from '../Components/Input.jsx';
import Img from '../../public/Img/image1.png';
import BotonSegundo from '../Components/BotonSegundo.jsx';
import Img2 from    '../../public/Img/olvidocontraseña.png';

const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState(''); // Estado para el color del mensaje
    const [showPassword, setShowPassword] = useState({ new: false, confirm: false });
    const [token, setToken] = useState(''); // Estado para el token
    const [email, setEmail] = useState(''); // Estado para el email

    // Extraer el token y el email de la URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');

        if (token && email) {
            setToken(token);
            setEmail(email);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones de la contraseña
        if (newPassword.length < 8) {
            setMessage('La contraseña debe tener al menos 8 caracteres.');
            setMessageColor('text-red-500'); // Cambia el color a rojo
            return;
        }
        if (!/[A-Z]/.test(newPassword)) {
            setMessage('La contraseña debe contener al menos una letra mayúscula.');
            setMessageColor('text-red-500'); // Cambia el color a rojo
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            setMessageColor('text-red-500'); // Cambia el color a rojo
            return;
        }

        // Solicitud de actualización de contraseña
        try {
            const response = await fetch('http://localhost:4000/api/update-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, email, newPassword }), // Incluye el token y el email
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Contraseña actualizada exitosamente.');
                setMessageColor('text-green-500'); // Cambia el color a verde
            } else {
                setMessage(result.error || 'Error al actualizar la contraseña.');
                setMessageColor('text-red-500'); // Cambia el color a rojo
            }
        } catch (error) {
            setMessage('Error al actualizar la contraseña.');
            setMessageColor('text-red-500'); // Cambia el color a rojo
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    return (
        <div className=" flex items-center justify-center  h-screen">
       <div className="  min-h-[60em] w-[100em]  flex column items-center ">
       <div className="bg-white p-8 rounded-lg  w-[40%] h-[40em] mb-[1em]  flex flex-col items-center justify-center ">

       <img src={Img} className="w-[25em] " />
                <h2 className="text-[33px] font-bold text-gray-800 text-center  mt-[15%] ">
                    Actualizar Contraseña
                </h2>
                <form onSubmit={handleSubmit} className="mt-6 " id="update-password-form">
                    <div className="mb-4 relative w-[20em] mt-[40px]mt-[40px]">
                        <label htmlFor="new-password" className="block text-gray-700 font-semibold">
                            Nueva Contraseña
                        </label>
                        <Input
                            type={showPassword.new ? 'text' : 'password'}
                            id="new-password"
                            placeholder="Nueva Contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <i
                            className={`bx ${showPassword.new ? 'bx-show' : 'bx-hide'} absolute right-2 top-[55px] transform -translate-y-1/2 cursor-pointer`}
                            onClick={() => togglePasswordVisibility('new')}
                        ></i>
                    </div>

                    <div className="mb-4 relative w-[20em] mt-[5px]">
                        <label htmlFor="confirm-password" className="block text-gray-700 font-semibold">
                            Confirmar Contraseña
                        </label>
                        <Input
                            type={showPassword.confirm ? 'text' : 'password'}
                            id="confirm-password"
                            placeholder="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <i
                            className={`bx ${showPassword.confirm ? 'bx-show' : 'bx-hide'} absolute right-2 top-[55px]  transform -translate-y-1/2 cursor-pointer`}
                            onClick={() => togglePasswordVisibility('confirm')}
                        ></i>
                    </div>

                    <div className="   flex items-center justify-center mt-[10px] ">
                          <BotonSegundo
                              Text= "Recuperar "
                             type="submit"
           
                              />
                     </div>
                    <p id="message" className={`mt-4 text-center ${messageColor}`}>
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

export default UpdatePassword;
