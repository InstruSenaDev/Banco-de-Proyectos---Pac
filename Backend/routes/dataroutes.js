import express from 'express';
import {
    getAllPersonas,
    getAllAlcances,
    getAllAreas,
    getTiposDeAreaPorArea,
    getObjetivosPorArea,
    getObjetivos,
    agregarPersona,
    obtenerTodosLosProyectos,
    getAllFicha,
    registerArea,
    getTipoDeArea,
    getItemsByAreaAndType,
    insertItem,
    addTipoDeArea,
    getItemsByTipoDeArea,
    registerFicha,
    getTiposDeArea,
    registerComplete,
    insertAlcance,
    insertObjetivo,
    getAllCategorias,
    createFicha,
    checkEmailExists,

  
} from '../controllers/datacontroler.js';


const router = express.Router();



// Ruta para obtener todas las categorías
router.get('/categorias', getAllCategorias);

// Ruta para insertar un nuevo alcance
router.post('/insertAlcance', insertAlcance);

// Ruta para insertar un nuevo objetivo
router.post('/insertObjetivo', insertObjetivo); // Ensure this matches the fetch call


router.post('/registerComplete', registerComplete);

router.post('/insertItem', insertItem);
router.get('/tipos-de-area', getTiposDeArea);
router.post('/tipos-de-area', addTipoDeArea);
router.get('/items/:idtiposdearea', getItemsByTipoDeArea);

router.post('/registerFicha', registerFicha);

router.get('/items/:idarea/:idtiposdearea', async (req, res) => {
    try {
        const { idarea, idtiposdearea } = req.params;
        const items = await getItemsByAreaAndType(idarea, idtiposdearea);
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error: error.message });
    }
});

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
        const { nombre, tipodocumento, numerodocumento, telefono, correo, contraseña, idrol, estado, idficha } = req.body;

        // Verificar si el correo ya existe
        const emailExists = await checkEmailExists(correo);
        if (emailExists) {
            return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
        }

        // Registrar la nueva persona incluyendo idficha si el rol es Aprendiz
        const newPerson = await agregarPersona({
            nombre,
            tipodocumento,
            numerodocumento,
            telefono,
            correo,
            contraseña,
            idrol,
            estado,
            idficha: idrol === 'Aprendiz' ? idficha : null
        });

        res.status(201).json(newPerson);
    } catch (error) {
        console.error('Error al registrar persona:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});



// Ruta para obtener todos los proyectos
router.get('/api/proyecto', async (req, res) => {
    try {
        const proyectos = await obtenerTodosLosProyectos();
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proyectos' });
    }
});



router.get('/ficha', async (req, res) => {
    try {
        const ficha = await getAllFicha();
        res.json(ficha);
    } catch (error) {
        console.error('Error al obtener fichas:', error);
        res.status(500).json({ error: 'Error interno del servidor', detalles: error.message });
    }
});


// Definir la ruta para registrar el área
router.post('/registerArea', async (req, res) => {
    try {
        const { area } = req.body;

        // Verifica si el campo "area" está presente
        if (!area) {
            return res.status(400).json({ message: 'El campo "area" es obligatorio.' });
        }

        const newArea = await registerArea({ area });
        res.status(201).json({
            message: 'Área registrada exitosamente',
            area: newArea
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el área', error: error.message });
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







export default router;