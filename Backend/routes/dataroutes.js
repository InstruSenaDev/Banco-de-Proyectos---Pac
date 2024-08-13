import express from 'express';
import cors from 'cors';
import { getAllPersonas, getAllUsuario, registerPerson, loginPerson, registerFicha, registerArea, getAllAreas, getTiposDeArea, registerTipoDeArea } from '../controllers/datacontroler.js';

const app = express(); // Crear la instancia de Express

// Configurar middleware
app.use(cors()); // Permite todas las solicitudes cross-origin
app.use(express.json()); // Para analizar JSON en el cuerpo de las solicitudes

// Crear el enrutador
const router = express.Router();

// Definir rutas
router.get('/personas', async (req, res) => {
    try {
        const personas = await getAllPersonas();
        res.json(personas);
    } catch (error) {
        console.error('Error al obtener personas:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Otros endpoints
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await getAllUsuario();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

router.get('/areas', async (req, res) => {
    try {
        const areas = await getAllAreas();
        res.json(areas);
    } catch (error) {
        console.error('Error al obtener áreas:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

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

router.post('/registerFicha', async (req, res) => {
    try {
        const newFicha = await registerFicha(req.body);
        res.status(201).json(newFicha);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar ficha' });
    }
});

router.post('/registerArea', async (req, res) => {
    try {
        const { area, estado } = req.body;
        const newArea = await registerArea({ area, estado });
        if (newArea.error) {
            res.status(400).json({ error: newArea.error });
        } else {
            res.status(201).json(newArea);
        }
    } catch (error) {
        console.error('Error al registrar área:', error.message, error.stack);
        res.status(500).json({ error: 'Error al registrar área', details: error.message });
    }
});

router.post('/api/registerTipoDeArea', async (req, res) => {
    try {
        const { tiposdearea, estado, idarea } = req.body;
        if (typeof idarea !== 'number' || isNaN(idarea)) {
            return res.status(400).json({ error: 'El idarea debe ser un número.' });
        }
        const newTipoDeArea = await registerTipoDeArea({ tiposdearea, estado, idarea });
        res.status(201).json(newTipoDeArea);
    } catch (error) {
        console.error('Error en el registro de tipo de área:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

export default router;

