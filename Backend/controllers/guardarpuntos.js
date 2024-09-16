import { pool } from '../config/db.js';

 // Controlador para actualizar el promedio de alcance
 const actualizarPuntosAlcance = async (req, res) => {
    const { idproyecto } = req.params;
    const { puntosalcance } = req.body;
  
    if (!idproyecto || typeof puntosalcance !== 'number') {
      return res.status(400).json({ error: 'Datos inválidos proporcionados.' });
    }
  
    try {
      // Actualización del campo puntosalcance en la tabla proyecto
      const result = await pool.query(
        'UPDATE proyecto SET puntosalcance = $1 WHERE idproyecto = $2 RETURNING *',
        [puntosalcance, idproyecto]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Proyecto no encontrado.' });
      }
  
      res.status(200).json({ message: 'Promedio de alcance actualizado correctamente', proyecto: result.rows[0] });
    } catch (error) {
      console.error('Error al actualizar el promedio de alcance:', error);
      res.status(500).json({ error: 'Error al actualizar el promedio de alcance.' });
    }
  };
  

export { actualizarPuntosAlcance };
