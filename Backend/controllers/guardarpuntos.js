// import { pool } from '../config/db.js';

// const actualizarPuntosObjetivos = async (req, res) => {
//     let { promedio } = req.body; // Tomamos el promedio del cuerpo
//     const { idproyecto } = req.params; // Tomamos idproyecto desde los parámetros de la URL

//     // Convertir promedio a número (asegurarse de que es un número)
//     promedio = parseFloat(promedio);

//     // Verificamos que idproyecto y promedio estén presentes y que promedio sea un número válido
//     if (!idproyecto || isNaN(promedio)) {
//       return res.status(400).json({ error: 'Datos incompletos o incorrectos' });
//     }

//     try {
//       console.log('Actualizando promedio para proyecto:', idproyecto);
//       console.log('Nuevo promedio:', promedio);

//       // Actualizar el campo puntosobjetivos en la tabla proyecto
//       const query = 'UPDATE proyecto SET puntosobjetivos = $1 WHERE idproyecto = $2';
//       const result = await pool.query(query, [promedio, idproyecto]);

//       console.log('Resultado de la consulta:', result);

//       return res.status(200).json({ message: 'Puntos de objetivos actualizados correctamente' });
//     } catch (error) {
//       console.error('Error al actualizar puntosobjetivos:', error);
//       return res.status(500).json({ error: 'Error al actualizar puntosobjetivos' });
//     }
// };

// export { actualizarPuntosObjetivos };
