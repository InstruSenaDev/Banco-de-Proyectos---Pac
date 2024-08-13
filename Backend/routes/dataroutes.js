import express from 'express';
import cors from 'cors';
import { getAllPersonas, getAllUsuario, registerPerson, loginPerson, getAllFichas, registerFicha } from '../controllers/datacontroler.js';

const app = express(); // Crear la instancia de Express

// Configurar middleware
app.use(cors()); // Permite todas las solicitudes cross-origin
app.use(express.json()); // Para analizar JSON en el cuerpo de las solicitudes

// Crear el enrutador
const router = express.Router();

// Obtener personas
router.get('/personas', async (req, res) => {
    try {
        const personas = await getAllPersonas();
        res.json(personas);
    } catch (error) {
        console.error('Error al obtener personas:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Optener usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await getAllUsuario();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

//Obtener fichas
router.get('/fichas', async (req, res) => {
    try {
        const fichas = await getAllFichas();
        res.json(fichas);
    } catch (error) {
        console.error('Error al obtener las fichas:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message});
    }
});

//Registro usuarios
router.post('/register', async (req, res) => {
    try {
        const { nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado } = req.body;
        const newPerson = await registerPerson({ nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado });
        res.status(201).json(newPerson);
    } catch (error) {
        console.error('Error al registrar persona:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

//Login
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
        const { nombre, numeroFicha, estado } = req.body;
        const newFicha = await registerFicha({ nombre, numeroFicha, estado });
        res.status(201).json(newFicha);
    } catch (error) {
    console.error('Error al registrar ficha:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;

