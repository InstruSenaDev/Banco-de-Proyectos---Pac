import { pool } from '../../config/db.js';


//-------En este controlador actualizo el promedio de alcance y guardo el promedio final--------------



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
  


  const guardarPromedioFinal = async (req, res) => {
    try {
      const { idproyecto } = req.params;
      const { proyectofinal } = req.body;
  
      // Validar que el promedio final esté presente
      if (proyectofinal === undefined || proyectofinal === null) {
        return res.status(400).json({ error: 'El promedio final es requerido' });
      }
  
      // Consulta para actualizar el campo proyectofinal en la base de datos
      const result = await pool.query(
        `UPDATE proyecto SET promediofinal = $1 WHERE idproyecto = $2`,
        [proyectofinal, idproyecto]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
      }
  
      return res.status(200).json({ message: 'Promedio final guardado correctamente' });
    } catch (error) {
      console.error('Error al guardar el promedio final:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

export { 
  actualizarPuntosAlcance,
  guardarPromedioFinal,
  
 };
