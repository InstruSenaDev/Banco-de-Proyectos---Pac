import React, { useState } from 'react';
import Input from '../Components/Input.jsx'; // Asegúrate de que la ruta sea correcta

const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState({ new: false, confirm: false });

    const togglePasswordVisibility = (type) => {
        setShowPassword((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación
        if (newPassword.length < 8) {
            setMessage('La contraseña debe tener al menos 8 caracteres.');
            return;
        }
        if (!/[A-Z]/.test(newPassword)) {
            setMessage('La contraseña debe contener al menos una letra mayúscula.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }

        // Solicitud de actualización de contraseña
        try {
            const response = await fetch('http://localhost:4000/api/update-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'user@example.com', newPassword }), // Asegúrate de que el email sea correcto
            });

            if (response.ok) {
                const result = await response.json();
                setMessage(result.message);
            } else {
                const result = await response.json();
                setMessage(result.error || 'Error al actualizar la contraseña.');
            }
        } catch (error) {
            setMessage('Error al actualizar la contraseña.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                    Actualizar Contraseña
                </h2>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4 relative">
                        <label htmlFor="new-password" className="block text-gray-700 font-semibold">
                            Nueva Contraseña
                        </label>
                        <Input
                            type={showPassword.new ? 'text' : 'password'}
                            id="new-password"
                            placeholder="Nueva Contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className=""
                        />
                        <i
                            className={`bx ${showPassword.new ? 'bx-show' : 'bx-hide'} absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer`}
                            onClick={() => togglePasswordVisibility('new')}
                        ></i>
                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="confirm-password" className="block text-gray-700 font-semibold">
                            Confirmar Contraseña
                        </label>
                        <Input
                            type={showPassword.confirm ? 'text' : 'password'}
                            id="confirm-password"
                            placeholder="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className=""
                        />
                        <i
                            className={`bx ${showPassword.confirm ? 'bx-show' : 'bx-hide'} absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer`}
                            onClick={() => togglePasswordVisibility('confirm')}
                        ></i>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg"
                    >
                        Actualizar Contraseña
                    </button>
                    <p id="message" className="mt-4 text-center text-red-500">
                        {message}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
