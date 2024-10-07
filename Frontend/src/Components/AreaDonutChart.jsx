
"use client";

import React, { useEffect, useState } from "react";
import  AreaChart  from "./AreaChart";
import  DonutChart  from "./DonutChart";

const AreaDonutChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/datos');
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            const result = await response.json();
            setData(result);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener datos:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    // Extraer datos para el gráfico de área
    const chartData = data.map(month => ({
        date: month.name,
        Aceptado: month.aceptado,
        Rechazado: month.rechazado,
        Devuelto: month.devuelto,
        EnProceso: month['en proceso'],
    }));

    // Calcular porcentajes para el gráfico de dona
    const totalProyectos = chartData.reduce((total, month) => total + month.Aceptado + month.Rechazado + month.Devuelto + month.EnProceso, 0);
    
    const donutData = [
        { name: "Aceptado", amount: (chartData.reduce((total, month) => total + month.Aceptado, 0) / totalProyectos) * 100 },
        { name: "Rechazado", amount: (chartData.reduce((total, month) => total + month.Rechazado, 0) / totalProyectos) * 100 },
        { name: "Devuelto", amount: (chartData.reduce((total, month) => total + month.Devuelto, 0) / totalProyectos) * 100 },
        { name: "En Proceso", amount: (chartData.reduce((total, month) => total + month.EnProceso, 0) / totalProyectos) * 100 },
    ];

    return (
        <div className="flex gap-16">
            <div className="flex  gap-4">
                <h2 className="text-lg font-semibold">Gráfico de Área de Proyectos por Estado</h2>
                <AreaChart
                    className="h-52"
                    data={chartData}
                    index="date"
                    categories={["Aceptado", "Rechazado", "Devuelto", "EnProceso"]}
                    showLegend={true}
                />
            </div>
            <div className="flex  gap-4">
                <h2 className="text-lg font-semibold">Distribución de Estados de Proyectos</h2>
                <DonutChart
                    data={donutData}
                    category="name"
                    value="amount"
                    valueFormatter={(number) => `${number.toFixed(2)}%`}
                />
            </div>
        </div>
    );
};

export default AreaDonutChart;
