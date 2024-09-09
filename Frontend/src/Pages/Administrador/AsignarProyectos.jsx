import { useState, useEffect } from 'react';
import LayoutPrincipal2 from '../../layouts/LayoutPrincipal2';
import Layoutcontenido2 from '../../Layouts/Layoutcontenido2';
import AprendicesList from '../../Components/AprendicesList';
import Loader from '../../Components/Loader';
import BotonSegundo from '../../Components/BotonSegundo';
import FichaSelector from '../../Components/FichaSelector';

// Datos de ejemplo (en una aplicación real, estos vendrían de una API o base de datos)
const fichas = [
    { id: 1, nombre: "Desarrollo Web", numeroficha: "1001" },
    { id: 2, nombre: "Diseño UX/UI", numeroficha: "1002" },
    { id: 3, nombre: "Análisis de Datos", numeroficha: "1003" },
];

const aprendices = {
    1: [
        { id: 1, nombre: "Juan Pérez", avatar: "👨🏽‍💻" },
        { id: 2, nombre: "María García", avatar: "👩🏼‍💻" },
    ],
    2: [
        { id: 3, nombre: "Carlos López", avatar: "👨🏻‍🎨" },
        { id: 4, nombre: "Ana Martínez", avatar: "👩🏾‍🎨" },
    ],
    3: [
        { id: 5, nombre: "Pedro Sánchez", avatar: "👨🏼‍🔬" },
        { id: 6, nombre: "Laura Rodríguez", avatar: "👩🏽‍🔬" },
    ],
};

const AsignarProyectos = () => {
    const [selectedFicha, setSelectedFicha] = useState('');
    const [assignedAprendices, setAssignedAprendices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleFichaChange = (event) => {
        setSelectedFicha(event.target.value);
        setAssignedAprendices([]);
    };

    const handleAssignAprendiz = (aprendiz) => {
        if (!assignedAprendices.find(a => a.id === aprendiz.id)) {
            setAssignedAprendices([...assignedAprendices, aprendiz]);
        }
    };

    const handleRemoveAprendiz = (aprendiz) => {
        setAssignedAprendices(assignedAprendices.filter(a => a.id !== aprendiz.id));
    };

    const handleConfirm = () => {
        console.log("Proyecto asignado a:", assignedAprendices);
    };

    return (
        <LayoutPrincipal2 title="">
            {loading ? (
                <div className="loading-container">
                    <Loader />
                </div>
            ) : (
                <div className="content-container">
                    <Layoutcontenido2 title="" text1="Asignación de Proyectos">
                        <div className="w-full mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Selección de Ficha por Nombre */}
                            <FichaSelector
                                fichas={fichas}
                                selectedFicha={selectedFicha}
                                onChange={handleFichaChange}
                                displayField="nombre"
                            />

                            {/* Selección de Ficha por Número */}
                            <FichaSelector
                                fichas={fichas}
                                selectedFicha={selectedFicha}
                                onChange={handleFichaChange}
                                displayField="numeroficha"
                            />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Aprendices Disponibles */}
                                <AprendicesList
                                    title="Aprendices Disponibles"
                                    items={aprendices[selectedFicha] || []}
                                    buttonText="Asignar"
                                    buttonAction={handleAssignAprendiz}
                                    buttonColor="bg-[#A3E784]"
                                />

                                {/* Aprendices Asignados */}
                                <AprendicesList
                                    title="Equipo del Proyecto"
                                    items={assignedAprendices}
                                    buttonText="Remover"
                                    buttonAction={handleRemoveAprendiz}
                                    buttonColor="bg-red-400"
                                />
                            </div>

                            <div className="mt-8 max-w-md mx-auto">
                                <BotonSegundo
                                    Text="Confirmar Asignación de Proyecto"
                                    onClick={handleConfirm}
                                    additionalClasses={`w-full py-3 text-sm font-medium rounded-lg ${
                                        assignedAprendices.length > 0
                                            ? 'bg-[#A3E784] text-white hover:bg-[#A3E784]'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    } transition-colors`}
                                    disabled={assignedAprendices.length === 0}
                                />
                            </div>
                        </div>
                    </Layoutcontenido2>
                </div>
            )}
        </LayoutPrincipal2>
    );
};

export default AsignarProyectos;
