import express from 'express';
import cors from 'cors';
import { getAllPersonas, getAllUsuario, registerPerson, loginPerson, registerFicha, getAllTipodeArea, registerArea, getAllAreas, getTipoDeArea, getAllFichas, registerTipoDeArea, registerItemArea, getAllItemsArea  } from '../controllers/datacontroler.js';

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

//Obtener Areas
router.get('/area', async (req, res) => {
    try {
        const area = await getAllAreas();
        res.json(area);
    } catch (error) {
        console.error('Error al obtener áreas:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

//Obtener Tipos de area
router.get('/tipodearea', async (req, res) => {
    try {
        const tiposdearea = await getAllTiposdeArea();
        res.json(tiposdearea);
    } catch (error) {
        console.error('Error al obtener áreas:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

//Obtener Fichas
router.get('/ficha', async (req, res) => {
    try {
        const ficha = await getAllFichas();
        res.json(ficha);
    } catch (error) {
        console.error('Error al obtener ficha:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para obtener todos los items en itemsarea
router.get('/api/itemsArea', async (req, res) => {
    try {
        const items = await getAllItemsArea();
        res.status(200).json(items);
    } catch (error) {
        console.error('Error al obtener items:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
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
//Registro ficha
router.post('/registerFicha', async (req, res) => {
    try {
        const newFicha = await registerFicha(req.body);
        res.status(201).json(newFicha);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar ficha' });
    }
});

// Ruta para registrar una nueva ficha
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

// Obtener tipos de área por área específica
router.get('/tipodearea/:idarea', async (req, res) => {
    const idarea = Number(req.params.idarea); // Asegurarse de que idarea es un número

    if (isNaN(idarea)) {
        return res.status(400).json({ error: 'El idarea debe ser un número válido.' });
    }
    try {
        const tiposDeArea = await getTipoDeArea(idarea);
        res.status(200).json(tiposDeArea);
    } catch (error) {
        console.error('Error al obtener tipos de área:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});

// Registro de tipo de área
router.post('/registerTipoDeArea', async (req, res) => {
    try {
        const { tiposdearea, estado, idarea } = req.body;
        // console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",req);
        
        if (typeof idarea !== 'number' || isNaN(idarea)) {
            return res.status(400).json({ error: 'El idarea debe ser un número válido.' });
        }

        const newTipoDeArea = await registerTipoDeArea({ tiposdearea, estado, idarea });
        if (newTipoDeArea.error) {
            return res.status(400).json({ error: newTipoDeArea.error });
        }

        res.status(201).json(newTipoDeArea);
    } catch (error) {
        console.error('Error al registrar tipo aaaade área aaaaa:', error.message);
        return res.status(500).json({ error: error.message });
    }
});

// Ruta para registrar un nuevo item en itemsarea
router.post('/api/registerItemArea', async (req, res) => {
    try {
        const { items, estado, idtiposdearea, idarea } = req.body;
        const newItem = await registerItemArea({ items, estado, idtiposdearea, idarea });
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error al registrar item:', error);
        res.status(500).json({ error: 'Error al registrar item.', details: error.message });
    }
});

// Middleware de manejo de errores
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor.', details: err.message });
});

export default router;

