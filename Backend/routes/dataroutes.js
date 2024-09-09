import express from 'express';
import { 
    getAllPersonas,
    getAllUsuario,
    registerPerson,
    getAllAlcances,
    getAllAreas,
    getTiposDeAreaPorArea,
    getItemsPorAreaYTipo,
    getObjetivosPorArea,
    getObjetivos,
    agregarPersona,
    obtenerTodosLosProyectos,
    deletePerson, 


} from '../controllers/datacontroler.js';

const router = express.Router();


// Ruta para obtener todas las personas
router.get('/personas', async (req, res) => {
    try {
        const personas = await getAllPersonas();
        res.json(personas);
    } catch (error) {
        console.error('Error al obtener personas:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
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

        // Verificar si el correo ya existe
        const emailExists = await checkEmailExists(correo);
        if (emailExists) {
            return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
        }

        // Registrar la nueva persona si el correo no existe
        const newPerson = await registerPerson({ nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol });
        res.status(201).json(newPerson);
    } catch (error) {
        console.error('Error al registrar persona:', error);
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


router.get('/objetivos/:idarea', async (req, res) => {
    const { idarea } = req.params;
    try {
        const objetivos = await getObjetivosPorArea(idarea);
        res.json(objetivos);
    } catch (error) {
        console.error('Error al obtener objetivos:', error);
        res.status(500).json({ error: 'Error al obtener objetivos' });
    }
});

router.post('/agregarpersona', async (req, res) => {
    try {
        const { nombre, tipodocumento, numerodocumento, telefono, correo, contraseña, idrol } = req.body;

        // Verificar si el correo ya existe
        const emailExists = await checkEmailExists(correo);
        if (emailExists) {
            return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
        }

        // Registrar la nueva persona si el correo no existe
        const newPerson = await agregarPersona({ nombre, tipodocumento, numerodocumento, telefono, correo, contraseña, idrol });
        res.status(201).json(newPerson);
    } catch (error) {
        console.error('Error al registrar persona:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para obtener todos los proyectos
router.get('/proyecto', async (req, res) => {
    try {
        const proyectos = await obtenerTodosLosProyectos();
        res.json(proyectos);
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ error: 'Error al obtener proyectos' });
    }
});

// Route to delete a person
router.delete('/personas/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log('Intentando eliminar persona con ID:', id);
      const deletedPerson = await deletePerson(id);
      if (deletedPerson) {
        console.log('Persona eliminada con éxito:', deletedPerson);
        res.json({ message: 'Persona eliminada con éxito', person: deletedPerson });
      } else {
        console.log('Persona no encontrada con ID:', id);
        res.status(404).json({ error: 'Persona no encontrada' });
      }
    } catch (error) {
      console.error('Error al eliminar persona:', error);
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
  });


export default router;