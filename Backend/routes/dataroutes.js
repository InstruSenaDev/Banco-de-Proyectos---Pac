import express from 'express';
import { supabase } from '../config/supabaseClient.js';
import transporter from '../config/nodemailerConfig.js';
import { v4 as uuidv4 } from 'uuid';
import { getAllPersonas, getAllUsuario, registerPerson, loginPerson, registerFicha } from '../controllers/datacontroler.js';

const router = express.Router();

// Ruta para actualizar la contraseña
router.post('/update-password', async (req, res) => {
    const { email, token, newPassword } = req.body;

    // Aquí puedes verificar el token y su validez antes de actualizar la contraseña
    // Por simplicidad, se omite la validación del token en este ejemplo

    try {
        const updatedUser = await updatePassword(email, newPassword);
        res.status(200).json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        console.error('Error al actualizare la ccontraseña:', error);
        res.status(500).json({ error: 'Error aleee actualizar la contraseña', details: error.message });
    }
});

router.post('/reset-password', async (req, res) => {
    const { email } = req.body;

    try {
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


// Ruta para obtener todas las personas
router.get('/personas', async (req, res) => {
    try {
        const personas = await getAllPersonas();
        res.json(personas);
    } catch (error) {
        console.error('Error al obtener personas:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await getAllUsuario();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para registrar una nueva persona
router.post('/register', async (req, res) => {
    try {
        console.log('Datos recibidos en la solicitud de registro:', req.body);
        const { nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado } = req.body;
        const newPerson = await registerPerson({ nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado });
        res.status(201).json(newPerson);
    } catch (error) {
        console.error('Error al registrar persona:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});



// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const { correo, contraseña } = req.body;
        const user = await loginPerson(correo, contraseña);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});


// Ruta para registrar una nueva ficha
router.post('/registerFicha', async (req, res) => {
    try {
        const newFicha = await registerFicha(req.body);
        res.status(201).json(newFicha);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar ficha' });
    }
});


export default router;