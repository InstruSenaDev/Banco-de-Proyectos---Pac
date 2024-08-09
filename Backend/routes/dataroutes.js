import express from 'express';
import { 
    getAllPersonas, 
    getAllUsuario, 
    registerPerson, 
    loginPerson, 
    registerProject, 
    getAllAlcances, 
    getAllAreas,
    getTiposDeAreaPorArea,
    getItemsPorAreaYTipo
    

} from '../controllers/datacontroler.js';

const router = express.Router();

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
        const { nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol } = req.body;
        const newPerson = await registerPerson({ nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol });
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

// Ruta para registrar un nuevo proyecto
router.post('/proyectos', async (req, res) => {
    try {
        console.log('Solicitud recibida:', req.body); 
        let { nombre, impacto, responsable, disponibilidad, dia, idalcance, idobjetivos, idarea, idficha, idpersona } = req.body;

        // Convertir cadenas vacías a null
        idalcance = idalcance || null;
        idobjetivos = idobjetivos || null;
        idarea = idarea || null;
        idficha = idficha || null;
        idpersona = idpersona || null;

        const newProject = await registerProject({ nombre, impacto, responsable, disponibilidad, dia, idalcance, idobjetivos, idarea, idficha, idpersona });
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error al registrar proyecto:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para obtener todas las preguntas junto con sus categorías
router.get('/alcances', async (req, res) => {
    try {
        const alcances = await getAllAlcances();
        res.json(alcances);
    } catch (error) {
        console.error('Error al obtener alcances:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para obtener todas las áreas
router.get('/areas', async (req, res) => {
    try {
        const areas = await getAllAreas();
        res.json(areas);
    } catch (error) {
        console.error('Error al obtener áreas:', error);
        res.status(500).json({ error: 'Error interno del servidor', detalles: error.message });
    }
});

// Ruta para obtener los tipos de área de acuerdo al área seleccionada
router.get('/tipos-de-area/:idArea', async (req, res) => {
    try {
      const idArea = req.params.idArea;
      const tiposDeArea = await getTiposDeAreaPorArea(idArea);
      res.json(tiposDeArea);
    } catch (error) {
      console.error('Error al obtener tipos de área:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  router.get('/items/:idArea/:idTiposDeArea', async (req, res) => {
    try {
      const { idArea, idTiposDeArea } = req.params;
      const items = await getItemsPorAreaYTipo(idArea, idTiposDeArea);
      res.json(items);
    } catch (error) {
      console.error('Error al obtener ítems:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  
export default router;
