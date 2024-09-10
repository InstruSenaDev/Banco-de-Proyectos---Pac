import React, { useState } from 'react';
import { useFichas } from '../../hooks/useFichas';
import { useAprendicesByFicha } from '../../hooks/useAprendicesByFicha';
import { Card, Title, Select, SelectItem, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
import Layoutprincipal from '../Layouts/Layoutprincipal';
import Layoutcontenido from '../Layouts/Layoutcontenido';

const PruebaComponent = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const { fichas, loading: fichasLoading, error: fichasError } = useFichas();
  const { aprendices, loading: aprendicesLoading, error: aprendicesError } = useAprendicesByFicha(selectedProject);

  const handleApprenticeToggle = (id) => {
    setAprendices(aprendices.map(app =>
      app.id === id ? { ...app, selected: !app.selected } : app
    ));
  };

  if (fichasLoading || aprendicesLoading) return <p>Cargando...</p>;
  if (fichasError || aprendicesError) return <p>Error al cargar los datos</p>;
  

  return (
    <Layoutprincipal title="Asignación de Proyecto">
      <Layoutcontenido>
        <Card>
          <div className="flex items-center mb-6">
            <Button variant="light" color="gray" className="mr-4">
              Asignación de proyecto
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Title>Proyecto Aprobado</Title>
              <Select
                className="mt-2"
                placeholder="Seleccione ficha"
                value={selectedProject}
                onValueChange={setSelectedProject}
              >
                {fichas.map(ficha => (
                  <SelectItem key={ficha.idficha} value={ficha.idficha}>{ficha.nombre}</SelectItem>
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
                  {aprendices.map((apprentice) => (
                    <TableRow key={apprentice.id}>
                      <TableCell>{apprentice.name}</TableCell>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={apprentice.selected || false}
                          onChange={() => handleApprenticeToggle(apprentice.id)}
                          className="form-checkbox h-5 w-5 text-green-500"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <Button variant="secondary">Volver</Button>
            <Button variant="primary">Guardar</Button>
          </div>
        </Card>
      </Layoutcontenido>
    </Layoutprincipal>
  );
};

export default PruebaComponent;
