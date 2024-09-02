import React from 'react';
import { Title, Text } from '@tremor/react';
import Layoutprincipal from '../../../Layouts/Layoutprincipal';
import Layoutcontenido from '../../../Layouts/Layoutcontenido'
import {CardBase} from'../Components/CardBase'
import {TabState} from '../Components/TabState';
import Grid from '../Components/Grid';
import {ChartDonut} from '../Components/ChartDonut';

const Dashboard = () => {
  return (
    <Layoutprincipal title="Proyectos">
      <Layoutcontenido title="contenido">
        <div className="bg-[#059669] p-6 sm:p-10 rounded">
          <Title className="text-white text-lg font-extrabold">Bienvenido SuperAdmin</Title>
          <Text className="text-white font-extrabold">Banco de Proyectos</Text>
        </div>


        <div className="flex flex-wrap gap-4 mt-16 z-0 w-full">
          <CardBase 
            title="Areas" 
            metricValue={20} 
            progressText="Proyectos creados" 
            buttonTex="Ver detalle" 
          />
          <CardBase 
            title="Crear Instructores" 
            metricValue={50} 
            progressText="Proyectos creados" 
            buttonTex="Ver detalle" 
          />
          <CardBase 
            title="Crear aprendices" 
            metricValue={40} 
            progressText="Proyectos creados" 
            buttonTex="Ver detalle" 
          />
          <CardBase 
            title="Craer Objetivos" 
            metricValue={90} 
            progressText="Proyectos creados" 
            buttonTex="Ver detalle" 
          />
          <CardBase 
            title="Crear Nose" 
            metricValue={50} 
            progressText="Proyectos creados" 
            buttonTex="Ver detalle" 
          />
          <CardBase 
            title="Proyectos" 
            metricValue={50} 
            progressText="Proyectos creados" 
            buttonTex="Ver detalle" 
          />
        </div>

        <div className="border-[1px] rounded-t-lg mt-10">
          <ChartDonut />

          {/* <div className="grid grid-cols-12 bg-[#059669] font-bold py-4 rounded-t-lg border-b">
              <div className="text-white text-lg font-extrabold col-span-12 md:col-span-2 text-center md:text-left px-6">
                OBJETIVOS
              </div>
            </div>

            <Grid Text1='' id1='' id2='' name='' categoria='' />
            <Grid Text1='' id1='' id2='' name='' categoria='' />
            <Grid Text1='' id1='' id2='' name='' categoria='' />
            <Grid Text1='' id1='' id2='' name='' categoria='' />
            <Grid Text1='' id1='' id2='' name='' categoria='' />
            <Grid Text1='' id1='' id2='' name='' categoria='' />
            <Grid Text1='' id1='' id2='' name='' categoria='' />
            <Grid Text1='' id1='' id2='' name='' categoria='' />
            <Grid Text1='' id1='' id2='' name='' categoria='' />
            <Grid Text1='' id1='' id2='' name='' categoria='' /> */}
        </div>
      </Layoutcontenido>
    </Layoutprincipal>
  );
};

export default Dashboard;