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
    getItemsPorAreaYTipo,
    getObjetivos,
    guardarRespuestas,
    getObjetivosPorArea,


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
        let { nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea } = req.body;

        // Convertir cadenas vacías a null
        idarea = idarea || null;
        idficha = idficha || null;
        idpersona = idpersona || null;
        idrespuestaobjetivos = idrespuestaobjetivos || null;
        idrespuestaalcance = idrespuestaalcance || null;
        iditems = iditems || null;
        idtiposdearea = idtiposdearea || null;

        const newProject = await registerProject({ nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea });
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

// Ruta para obtener todos los objetivos
router.get('/objetivos', async (req, res) => {
    try {
        const objetivos = await getObjetivos();
        res.json(objetivos);
    } catch (error) {
        console.error('Error al obtener objetivos:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para guardar las respuestas de alcance
router.post('/guardarRespuestas', async (req, res) => {
    const idproyecto = parseInt(req.body.idproyecto, 10);

    if (isNaN(idproyecto)) {
        return res.status(400).json({ error: 'ID del proyecto inválido' });
    }

    try {
        const respuestas = req.body;
        const respuestasAlcance = [];

        for (const [key, value] of Object.entries(respuestas)) {
            if (key !== 'idproyecto') {
                const idalcance = key.replace('pregunta', ''); // Obtener el id de alcance de la pregunta
                // Convertir el valor a booleano
                respuestasAlcance.push({ idproyecto, idalcance, respuesta: value === 'true' });
            }
        }

        await guardarRespuestas(respuestasAlcance);
        
        // Redirige a la URL
        res.redirect('http://localhost:4321/VistaUsuario');
    } catch (error) {
        console.error('Error al guardar respuestas:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});

router.get('/api/objetivos/:idarea', async (req, res) => {
    const { idarea } = req.params;
    try {
      const objetivos = await getObjetivosPorArea(idarea);
      res.json(objetivos);
    } catch (error) {
      console.error('Error fetching objetivos:', error);
      res.status(500).json({ error: 'Error fetching objetivos' });
    }
  });


export default router;