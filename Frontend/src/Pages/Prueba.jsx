// import React, { useState, useEffect } from 'react';
// import { Card, Title, Select, SelectItem, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
// import Layoutprincipal from '../Layouts/Layoutprincipal';
// import Layoutcontenido from '../Layouts/Layoutcontenido';

// const PruebaComponent = () => {
//   const [fichas, setFichas] = useState([]);
//   const [aprendices, setAprendices] = useState([]);
//   const [selectedFicha, setSelectedFicha] = useState('');

//   // Cargar todas las fichas al montar el componente
//   useEffect(() => {
//     const fetchFichas = async () => {
//       try {
//         const response = await fetch('http://localhost:4000/api/fichas'); // Ruta completa al backend
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setFichas(data);
//       } catch (error) {
//         console.error('Error al cargar las fichas:', error);
//       }
//     };
//     fetchFichas();
//   }, []);

//   // Cargar los aprendices cuando se selecciona una ficha
//   useEffect(() => {
//     const fetchAprendices = async () => {
//       if (selectedFicha) {
//         try {
//           const response = await fetch(`http://localhost:4000/api/aprendices/${selectedFicha}`); // Ruta al controlador que obtiene aprendices por ficha
//           if (!response.ok) {
//             throw new Error(`Error ${response.status}: ${response.statusText}`);
//           }
//           const data = await response.json();
//           setAprendices(data);
//         } catch (error) {
//           console.error('Error al cargar los aprendices:', error);
//         }
//       }
//     };

//     fetchAprendices();
//   }, [selectedFicha]);

//   return (
//     <Layoutprincipal title="Asignación de Proyecto">
//       <Layoutcontenido>
//         <Card>
//           <div className="flex items-center mb-6">
//             <Button variant="light" color="gray" className="mr-4">
//               Asignación de proyecto
//             </Button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <Title>Proyecto Aprobado</Title>
//               <Select
//                 className="mt-2"
//                 placeholder="Seleccione ficha"
//                 onValueChange={(value) => setSelectedFicha(value)}
//               >
//                 {fichas.map((ficha) => (
//                   <SelectItem key={ficha.idficha} value={ficha.idficha}>
//                     {ficha.nombre} - {ficha.numeroficha}
//                   </SelectItem>
//                 ))}
//               </Select>
//             </div>

//             <div>
//               <Title className="mb-2">Listado de Aprendices</Title>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableHeaderCell>Nombre</TableHeaderCell>
//                     <TableHeaderCell>Seleccionar</TableHeaderCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {aprendices.map((aprendiz) => (
//                     <TableRow key={aprendiz.idpersonas}>
//                       <TableCell>{aprendiz.nombre}</TableCell>
//                       <TableCell>
//                         <input
//                           type="checkbox"
//                           className="form-checkbox h-5 w-5 text-green-500"
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           </div>

//           <div className="flex justify-end mt-6 space-x-4">
//             <Button variant="secondary">Volver</Button>
//             <Button variant="primary">Guardar</Button>
//           </div>
//         </Card>
//       </Layoutcontenido>
//     </Layoutprincipal>
//   );
// };

// export default PruebaComponent;
