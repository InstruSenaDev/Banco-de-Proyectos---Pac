import express from 'express';
import { 
    actualizarPuntosAlcance

} from '../controllers/guardarpuntos.js';

const router = express.Router();



router.put('/proyectos/:idproyecto', actualizarPuntosAlcance);


export default router;