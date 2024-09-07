import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import Layoutprincipal from "../Layouts/Layoutprincipal";
import Layoutcontenido2 from "../Layouts/Layoutcontenido2";
import { BarState } from "../Components/BarState";
import { ModalComent } from "../Components/ModalComent";
import BotonPrincipal from "../Components/BotonPrincipal";
import Loader from "../Components/Loader";
import { ModalConfirm } from "../Components/ModalConfirm";

const Calificacion = () => {
    const { idproyecto } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const promedioObjetivos = location.state?.promedioObjetivos || 0;
    const promedioAlcance = location.state?.promedio || 0;
    const [promedioFinal, setPromedioFinal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const promedioFinalCalculado = Math.round((promedioObjetivos + promedioAlcance) / 2);
        setPromedioFinal(promedioFinalCalculado);
    }, [promedioAlcance, promedioObjetivos]);

    const guardarCalificacion = async (estado, comentario) => {
        setLoading(true); // Mostrar el Loader
        const calificacionData = {
            idproyecto,
            resultado: promedioFinal.toFixed(2),
            estado,
            comentario
        };

        try {
            const response = await fetch("http://localhost:4000/api/calificaciones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(calificacionData),
            });

            if (response.ok) {
                // Después de guardar, mostrar el modal de confirmación
                setLoading(false); // Ocultar el Loader
                setShowConfirmModal(true); // Mostrar el ModalConfirm
            } else {
                console.error("Error al guardar la calificación");
                setLoading(false); // Ocultar el Loader si hay un error
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            setLoading(false); // Ocultar el Loader si hay un error
        }
    };

    const handleAceptar = (comentario) => {
        guardarCalificacion("Aceptado", comentario);
    };

    const handleDevolver = (comentario) => {
        guardarCalificacion("Devuelto", comentario);
    };

    const handleRechazar = (comentario) => {
        guardarCalificacion("Rechazado", comentario);
    };

    const handleConfirmClose = () => {
        setShowConfirmModal(false);
        navigate("/"); // Redirigir al inicio
    };

    return (
        <Layoutprincipal title="Detalle del proyecto">
            <Layoutcontenido2 title="" text1="Calificacion del proyecto">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="w-full h-full">
                        <div className="flex flex-col justify-end text-center gap-y-5">
                            {/* <p className="text-xl font-bold">Promedio de Calificaciones: {promedioAlcance.toFixed(2)}</p> */}
                            <p className="text-xl font-bold">Promedio Final: {promedioFinal.toFixed(2)}</p>
                            <div className="w-full h-full ">
                                <BarState promedioFinal={promedioFinal} />
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-center mt-6 gap-x-2">
                            <ModalComent text="Rechazar" buttonColor="bg-red-500" onSubmit={handleRechazar} />
                            <ModalComent text="Devolver" buttonColor="bg-yellow-400" onSubmit={handleDevolver} />
                            <ModalComent text="Aceptar" buttonColor="bg-green-700" onSubmit={handleAceptar} />
                        </div>
                        <div className="w-full flex flex-row justify-center mt-3">
                            <Link to={`/alcance/${idproyecto}`}>
                                <BotonPrincipal Text="Atrás" textColor="text-black" />
                            </Link>
                        </div>
                    </div>
                )}

                {showConfirmModal && (
                    <ModalConfirm onClose={handleConfirmClose} />
                )}
            </Layoutcontenido2>
        </Layoutprincipal>
    );
};

export default Calificacion;
