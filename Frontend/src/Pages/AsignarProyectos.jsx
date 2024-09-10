import React from 'react';
import { Card, Title, Select, SelectItem, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
import Layoutprincipal from '../Layouts/Layoutprincipal';
import Layoutcontenido from '../Layouts/Layoutcontenido';
import useFichasYAprendices from '../../hooks/useFichasYAprendices';
import BotonPrincipal from '../Components/BotonPrincipal';
import BotonSegundo from '../Components/BotonSegundo';
import Layoutcontenido2 from '../Layouts/Layoutcontenido2';
const AsignarProyectos = () => {
  const {
    fichas,
    aprendices,
    selectedFicha,
    setSelectedFicha,
    loading,
    error,
  } = useFichasYAprendices();

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
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex justify-end mt-6 mr-4 space-x-4">
          <BotonPrincipal Text='Volver'/>
          <BotonSegundo Text='Guardar'/>
          </div>
        </Card>
      </Layoutcontenido2>
    </Layoutprincipal>
  );
};

export default AsignarProyectos;
