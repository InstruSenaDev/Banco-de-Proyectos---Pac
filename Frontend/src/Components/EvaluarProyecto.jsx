// import React from 'react';
// import { ProgressBar } from "@/components/ProgressBar";

// const EvaluarProyecto = ({ promedioObjetivos, promedioAlcance }) => {
//   const promedioTotal = (promedioObjetivos + promedioAlcance) / 2;

//   let decision;
//   if (promedioTotal >= 8) {
//     decision = 'Aprobar';
//   } else if (promedioTotal >= 5) {
//     decision = 'Devolver';
//   } else {
//     decision = 'Rechazar';
//   }

//   return (
//     <div className="text-center mt-6">
//       <h2 className="text-2xl font-bold">Promedio Total: {promedioTotal.toFixed(2)}</h2>
//       <ProgressBar value={promedioTotal * 10} className="mx-auto mt-4" />

//       <h3 className={`text-2xl mt-4 ${decision === 'Aprobar' ? 'text-green-500' : decision === 'Devolver' ? 'text-yellow-500' : 'text-red-500'}`}>
//         Decisión: {decision}
//       </h3>
//     </div>
//   );
// };

// export default EvaluarProyecto;
