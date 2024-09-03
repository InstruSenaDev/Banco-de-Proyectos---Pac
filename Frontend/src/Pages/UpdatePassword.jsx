import React, { useState, useEffect } from 'react'; // Add this line to import hooks
import Input from '../Components/Input.jsx'; // Ensure the path to Input component is correct


const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Extraer el token y el email de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');

        if (token) setToken(token);
        if (email) setEmail(email);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let valid = true;

        // Validaciones para la nueva contraseña
        if (!newPassword || newPassword.length < 8) {
            valid = false;
            setMessage('La contraseña debe tener al menos 8 caracteres.');
        } else if (!/[A-Z]/.test(newPassword)) {
            valid = false;
            setMessage('La contraseña debe contener al menos una letra mayúscula.');
        } else if (newPassword !== confirmPassword) {
            valid = false;
            setMessage('Las contraseñas no coinciden.');
        }

        if (valid) {
            try {
                const response = await fetch('http://localhost:4000/api/update-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token, email, newPassword }),
                });
                const result = await response.json();

                if (response.ok) {
                    setMessage('La contraseña se actualiza exitosamente.');
                } else {
                    setMessage(result.error || 'Error al actualizar la contraseña.');
                }
            } catch (error) {
                setMessage('Error al actualizar la contraseña.');
            }
        }
    };

    const togglePasswordVisibility = (inputField, toggleIcon) => {
        if (inputField.type === 'password') {
            inputField.type = 'text';
            toggleIcon.classList.add('bx-show');
            toggleIcon.classList.remove('bx-hide');
        } else {
            inputField.type = 'password';
            toggleIcon.classList.add('bx-hide');
            toggleIcon.classList.remove('bx-show');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Actualizar contraseña</h2>
                <form id="update-password-form" onSubmit={handleSubmit} className="mt-6">
                    <input type="hidden" value={token} />
                    <input type="hidden" value={email} />
                    <div className="mb-4 relative">
                        <label htmlFor="new-password" className="block text-gray-700 font-semibold">Nueva contraseña</label>
                        <InputField
                            type="password"
                            id="new-password"
                            placeholder="Introduce tu nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <i
                            className="bx bx-show absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => togglePasswordVisibility(document.getElementById('new-password'), document.getElementById('togglePasswordRegistro'))}
                            id="togglePasswordRegistro"
                        ></i>
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="confirm-password" className="block text-gray-700 font-semibold">Confirmar contraseña</label>
                        <InputField
                            type="password"
                            id="confirm-password"
                            placeholder="Confirma tu nueva contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <i
                            className="bx bx-show absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => togglePasswordVisibility(document.getElementById('confirm-password'), document.getElementById('togglePasswordConfirmacion'))}
                            id="togglePasswordConfirmacion"
                        ></i>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg">Actualizar contraseña</button>
                    <p className={`mt-4 text-center ${message.includes('éxitosamente') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;