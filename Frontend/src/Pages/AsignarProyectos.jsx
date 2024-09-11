// import React, { useState } from 'react';
// import { Card, Title, Select, SelectItem, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
// import Layoutprincipal from '../Layouts/LayoutPrincipal';
// import Layoutcontenido2 from '../layouts/Layoutcontenido2';
// import useFichasYAprendices from '../../hooks/useFichasYAprendices';
// import { useAsignarProyecto } from '../../hooks/useAsignarProyecto';
// import BotonPrincipal from '../Components/BotonPrincipal';
// import BotonSegundo from '../Components/BotonSegundo';

// const AsignarProyectos = () => {
//   const {
//     fichas,
//     aprendices,
//     selectedFicha,
//     setSelectedFicha,
//     loading,
//     error,
//   } = useFichasYAprendices();

//   const { asignarProyecto, loading: saving, error: saveError } = useAsignarProyecto();
//   const [selectedAprendices, setSelectedAprendices] = useState([]);

//   const handleCheckboxChange = (idpersona) => {
//     setSelectedAprendices(prevState =>
//       prevState.includes(idpersona)
//         ? prevState.filter(id => id !== idpersona)
//         : [...prevState, idpersona]
//     );
//   };

//   const handleGuardarClick = async () => {
//     for (const idpersona of selectedAprendices) {
//       await asignarProyecto(selectedFicha, idpersona);
//     }
//     // Aquí puedes agregar lógica adicional después de guardar, como mostrar una notificación o redirigir al usuario.
//   };

//   return (
//     <Layoutprincipal title="Asignación de Proyecto">
//       <Layoutcontenido2 text1="Asignar Proyecto">
//         <Card className='h-[450px]'>
//           <div className="flex items-center mb-6">
//             <Button variant="light" color="gray" className="mr-4">
//               Asignación de proyecto
//             </Button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <Title>Proyecto Aprobado</Title>
//               {loading && <p>Cargando...</p>}
//               {error && <p>Error: {error}</p>}
//               <Select
//                 className="mt-2"
//                 placeholder="Seleccione ficha"
//                 onValueChange={(value) => setSelectedFicha(value)}
//                 value={selectedFicha}
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
//                           checked={selectedAprendices.includes(aprendiz.idpersonas)}
//                           onChange={() => handleCheckboxChange(aprendiz.idpersonas)}
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           </div>

//           <div className="flex justify-end mt-6 mr-4 space-x-4">
//             <BotonPrincipal Text='Volver' />
//             <BotonSegundo Text='Guardar' onClick={handleGuardarClick} disabled={saving} />
//           </div>

//           {saveError && <p className="text-red-500">Error al guardar la asignación: {saveError}</p>}
//         </Card>
//       </Layoutcontenido2>
//     </Layoutprincipal>
//   );
// };

// export default AsignarProyectos;


import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Title, Select, SelectItem, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
import Layoutprincipal from '../Layouts/Layoutprincipal';
import Layoutcontenido2 from '../layouts/Layoutcontenido2';
import BotonSegundo from '../Components/BotonSegundo';
import useFichasYAprendices from '../../hooks/useFichasYAprendices';
import usePostCalificacion from '../../hooks/usePostCalificacion'; // Importa el hook

const AsignarProyectos = () => {
  const { idproyecto } = useParams();
  const {
    fichas,
    aprendices,
    selectedFicha,
    setSelectedFicha,
    loading,
    error,
  } = useFichasYAprendices();

  const [selectedAprendices, setSelectedAprendices] = useState([]);
  const { postCalificacion, loading: saving } = usePostCalificacion(); // Usa el hook

  const handleCheckboxChange = (idpersona) => {
    setSelectedAprendices(prevState =>
      prevState.includes(idpersona)
        ? prevState.filter(id => id !== idpersona)
        : [...prevState, idpersona]
    );
  };

  const handleGuardarClick = async () => {
    const estado = "Asignado";
    const comentario = "Asignación de proyecto realizada"; // Puedes modificar este texto según tus necesidades

    // Detalles que podrían ser relevantes para la asignación
    const detalles = selectedAprendices.map(idpersona => ({
      idpersona,
      idficha: selectedFicha,
      idproyecto,
    }));

    try {
      await postCalificacion(idproyecto, 0, estado, comentario, detalles); // Llama a postCalificacion desde el hook
      // La redirección se maneja dentro del hook
    } catch (error) {
      alert('Hubo un error al guardar la asignación');
    }
  };

  return (
    <Layoutprincipal title="Asignación de Proyecto">
      <Layoutcontenido2 text1="Asignar Proyecto">
        <Card className='h-[450px]'>
          <div className="flex items-center mb-6">
            <Button variant="light" color="gray" className="mr-4">
              Asignación de proyecto
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Title>Proyecto Aprobado</Title>
              {loading && <p>Cargando...</p>}
              {error && <p>Error: {error}</p>}
              <Select
                className="mt-2"
                placeholder="Seleccione ficha"
                onValueChange={(value) => setSelectedFicha(value)}
                value={selectedFicha}
              >
                {fichas.map((ficha) => (
                  <SelectItem key={ficha.idficha} value={ficha.idficha}>
                    {ficha.nombre} - {ficha.numeroficha}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <Title className="mb-2">Listado de Aprendices</Title>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Nombre</TableHeaderCell>
                    <TableHeaderCell>Seleccionar</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {aprendices.map((aprendiz) => (
                    <TableRow key={aprendiz.idpersonas}>
                      <TableCell>{aprendiz.nombre}</TableCell>
                      <TableCell>
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-green-500"
                          checked={selectedAprendices.includes(aprendiz.idpersonas)}
                          onChange={() => handleCheckboxChange(aprendiz.idpersonas)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex justify-end mt-6 mr-4 space-x-4">
            <BotonSegundo Text='Guardar' onClick={handleGuardarClick} disabled={saving} />
          </div>

          {error && <p className="text-red-500">Error al guardar la asignación: {error}</p>}
        </Card>
      </Layoutcontenido2>
    </Layoutprincipal>
  );
};

export default AsignarProyectos;
