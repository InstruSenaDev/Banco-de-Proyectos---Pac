// import React, { useEffect, useState } from "react";
// import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
// import Layoutprincipal from "../Layouts/Layoutprincipal";
// import Layoutcontenido2 from "../Layouts/Layoutcontenido2";
// import { BarState } from "../Components/BarState";
// import { ModalComent } from "../Components/ModalComent";
// import BotonPrincipal from "../Components/BotonPrincipal";
// import Loader from "../Components/Loader";
// import { usePostCalificacion } from "../../hooks/usePostCalificacion";
// import { ModalConfirm } from "../Components/ModalConfirm"; // Importa el modal

// const Calificacion = () => {
//     const { idproyecto } = useParams();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const promedioObjetivos = location.state?.promedioObjetivos || 0;
//     const promedioAlcance = location.state?.promedio || 0;
//     const [promedioFinal, setPromedioFinal] = useState(0);
//     const [viewLoading, setViewLoading] = useState(true);
//     const { postCalificacion, loading } = usePostCalificacion();
//     const [mostrarModal, setMostrarModal] = useState(false);

//     useEffect(() => {
//         const promedioFinalCalculado = Math.round((promedioObjetivos + promedioAlcance) / 2);
//         setPromedioFinal(promedioFinalCalculado);
//         setViewLoading(false);
//     }, [promedioAlcance, promedioObjetivos]);

//     const guardarCalificacion = async (estado, comentario) => {
//         const detalles = [...(location.state.detallesObjetivos || []), ...(location.state.detallesAlcance || [])];

//         const exito = await postCalificacion(idproyecto, promedioFinal, estado, comentario, detalles);

//         if (exito) {
//             if (estado === "Aceptado") {
//                 navigate("/asignar-proyectos");
//             } else {
//                 setMostrarModal(true);
//             }
//         } else {
//             console.error("Hubo un problema al guardar la calificación o al actualizar el proyecto.");
//         }
//     };

//     const handleAceptar = (comentario) => {
//         guardarCalificacion("Aceptado", comentario);
//     };

//     const handleDevolver = (comentario) => {
//         guardarCalificacion("Devuelto", comentario);
//     };

//     const handleRechazar = (comentario) => {
//         guardarCalificacion("Rechazado", comentario);
//     };

//     const cerrarModal = () => {
//         setMostrarModal(false);
//         navigate("/"); // Redirige a la vista de inicio
//     };

//     return (
//         <Layoutprincipal title="Detalle del proyecto">
//             {viewLoading ? (
//                 <Loader />
//             ) : (
//                 <Layoutcontenido2 title="" text1="Calificación del proyecto">
//                     {loading ? (
//                         <Loader />
//                     ) : (
//                         <div className="w-full h-full">
//                             <div className="flex flex-col justify-end text-center gap-y-5">
//                                 <p className="text-xl font-bold">Promedio Final: {promedioFinal.toFixed(2)}</p>
//                                 <div className="w-full h-full">
//                                     <BarState promedioFinal={promedioFinal} />
//                                 </div>
//                             </div>
//                             <div className="w-full flex flex-row justify-center mt-6 gap-x-2">
//                                 <ModalComent text="Rechazar" buttonColor="bg-red-500" onSubmit={handleRechazar} />
//                                 <ModalComent text="Devolver" buttonColor="bg-yellow-400" onSubmit={handleDevolver} />
//                                 <ModalComent text="Aceptar" buttonColor="bg-green-700" onSubmit={handleAceptar} />
//                             </div>
//                             <div className="w-full flex flex-row justify-center mt-3">
//                                 <Link to={`/alcance/${idproyecto}`}>
//                                     <BotonPrincipal Text="Atrás" textColor="text-black" />
//                                 </Link>
//                             </div>
//                         </div>
//                     )}
//                 </Layoutcontenido2>
//             )}
//             {mostrarModal && <ModalConfirm onClose={cerrarModal} />}
//         </Layoutprincipal>
//     );
// };

// export default Calificacion;

import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import Layoutprincipal from "../Layouts/LayoutPrincipal";
import Layoutcontenido2 from "../Layouts/Layoutcontenido2";
import { BarState } from "../Components/BarState";
import { ModalComent } from "../Components/ModalComent";
import BotonPrincipal from "../Components/BotonPrincipal";
import Loader from "../Components/Loader";
import { ModalConfirm } from "../Components/ModalConfirm";
import usePostCalificacion from "../../hooks/usePostCalificacion";
import { Card, Text, Metric } from "@tremor/react";

const Calificacion = () => {
    const { idproyecto } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const promedioObjetivos = location.state?.promedioObjetivos || 0;
    const promedioAlcance = location.state?.promedio || 0;
    const [promedioFinal, setPromedioFinal] = useState(0);
    const [viewLoading, setViewLoading] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [comentario, setComentario] = useState("");
    const [estado, setEstado] = useState("");

    const { postCalificacion, loading } = usePostCalificacion();

    useEffect(() => {
        const promedioFinalCalculado = Math.round((promedioObjetivos + promedioAlcance) / 2);
        setPromedioFinal(promedioFinalCalculado);
        setViewLoading(false);
    }, [promedioAlcance, promedioObjetivos]);

    const handleAction = (action, comentario) => {
        setEstado(action);
        setComentario(comentario);
        setShowConfirmModal(true);
    };

    const handleConfirmClose = async () => {
        const detalles = [...(location.state.detallesObjetivos || []), ...(location.state.detallesAlcance || [])];
        try {
            await postCalificacion(idproyecto, promedioFinal, estado, comentario, detalles);
            navigate(`/asignar-proyectos/${idproyecto}`);
        } catch (error) {
            console.error("Error al guardar la calificación:", error);
        }
    };

    const handleCancelConfirm = () => {
        setShowConfirmModal(false);
    };

    return (
        <Layoutprincipal title="Detalle del proyecto">
            {viewLoading ? (
                <Loader />
            ) : (
                <Layoutcontenido2 title="" text1="Calificación del proyecto">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="w-full max-w-4xl mx-auto px-4 py-8">
                            <Card className="mb-8 p-6">
                                <Text className="text-center text-xl font-semibold mb-2">Promedio Final</Text>
                                <Metric className="text-center text-4xl font-bold mb-4">{promedioFinal.toFixed(2)}</Metric>
                                <div className="w-full h-24 mt-4">
                                    <BarState promedioFinal={promedioFinal} />
                                </div>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <Card decoration="top" decorationColor="blue">
                                    <Text>Objetivos</Text>
                                    <Metric>{promedioObjetivos.toFixed(2)}</Metric>
                                </Card>
                                <Card decoration="top" decorationColor="blue">
                                    <Text>Alcance</Text>
                                    <Metric>{promedioAlcance.toFixed(2)}</Metric>
                                </Card>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                                <ModalComent text="Rechazar" buttonColor="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onSubmit={(comentario) => handleAction("Rechazado", comentario)} />
                                <ModalComent text="Devolver" buttonColor="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded" onSubmit={(comentario) => handleAction("Devuelto", comentario)} />
                                <ModalComent text="Aceptar" buttonColor="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded" onSubmit={(comentario) => handleAction("Aceptado", comentario)} />
                            </div>

                            <div className="flex justify-center">
                                <Link to={`/alcance/${idproyecto}`}>
                                    <BotonPrincipal Text="Atrás" textColor="text-white" className="bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded" />
                                </Link>
                            </div>
                        </div>
                    )}

                    {showConfirmModal && (
                        <ModalConfirm
                            onConfirm={handleConfirmClose}
                            onCancel={handleCancelConfirm}
                        />
                    )}
                </Layoutcontenido2>
            )}
        </Layoutprincipal>
    );
};

export default Calificacion;

