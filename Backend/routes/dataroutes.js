import express from 'express';
import { supabase } from '../config/supabaseClient.js';
import { updatePassword, checkIfUserExists } from '../controllers/datacontroler.js';
import transporter from '../config/nodemailerConfig.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Ruta para actualizar la contraseña
router.post('/update-password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await updatePassword(email, newPassword);
        res.status(200).json({ message: 'Contraseña actualizada con éxito', user });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.status(500).json({ error: 'Error al actualizar la contraseña', details: error.message });
    }
});

// Ruta para solicitar el enlace de recuperación de contraseña
router.post('/reset-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Verificar si el usuario existe
        const userExists = await checkIfUserExists(email);

        if (!userExists) {
            return res.status(404).json({ error: 'Por favor regístrate para hacer el cambio de contraseña.' });
        }

        const resetToken = uuidv4(); // Genera un token único
        const resetLink = `http://localhost:4321/UpdatePassword?token=${resetToken}&email=${encodeURIComponent(email)}`;

        const mailOptions = {
            from: 'pac.bancodeproyectos@gmail.com',
            to: email,
            subject: 'Recuperación de Contraseña',
            html: `<p>Haga clic en el siguiente enlace para restablecer su contraseña: <a href="${resetLink}">Restablecer Contraseña</a></p>`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Enlace de restablecimiento enviado' });
    } catch (error) {
        console.error('Error al enviar el enlace de restablecimiento:', error);
        res.status(500).json({ error: `Error al enviar el enlace de restablecimiento: ${error.message}` });
    }
});

export default router;