// import { useState, useEffect } from 'react';

// const useDetalleCalificacion = (idproyecto) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const guardarDetalleCalificacion = async (detalles) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`http://localhost:4000/api/detalle_calificacion/${idproyecto}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(detalles),
//       });

//       if (!response.ok) {
//         throw new Error('Error al guardar el detalle de la calificación');
//       }

//       setLoading(false);
//       return await response.json();
//     } catch (err) {
//       setLoading(false);
//       setError(err.message);
//     }
//   };

//   return {
//     guardarDetalleCalificacion,
//     loading,
//     error,
//   };
// };

// export default useDetalleCalificacion;


// hooks/useDetalleCalificacion.js

import { useState } from 'react';

const useDetalleCalificacion = (idproyecto) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const guardarDetalleCalificacion = async (detalles) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/actualizarEstadoRespuestas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(detalles),
      });

      if (!response.ok) {
        throw new Error(`Error al guardar detalles: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { guardarDetalleCalificacion, loading, error };
};




export default useDetalleCalificacion;
