import React, { useState, useEffect } from 'react';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../React/Input2';
import BotonSegundo from '../React/BotonSegundoModal';
import SelectBoxArea from '../React/SelectBoxArea';

// Función para obtener áreas
const fetchArea = async () => {
    try {
        const response = await fetch("http://localhost:4000/api/area");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.map((area) => ({ value: area.id, label: area.area })); // Ajustar para incluir ID
    } catch (error) {
        console.error("Error al obtener áreas:", error);
        return [];
    }
};

export default function TipoArea() {
    const [isOpen, setIsOpen] = useState(false);
    const [area, setAreaOptions] = useState([]);

    // Obtener áreas al montar el componente
    useEffect(() => {
        const loadAreas = async () => {
            const areas = await fetchArea();
            setAreaOptions(areas);
        };
        loadAreas();
    }, []);

    return (
        <>
            <div className="flex items-center justify-center py-36">
                <button
                    type="button"
                    className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2 text-center text-tremor-default font-medium bg-tremor-background-emphasis text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                    onClick={() => setIsOpen(true)}
                >
                    Show Dialog
                </button>
            </div>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                static={true}
                className="z-[100]"
            >
                <DialogPanel className="sm:max-w-md">
                    <button
                        type="button"
                        className="absolute right-4 top-4 p-2 bg-transparent border-none text-tremor-content-subtle hover:text-tremor-content hover:bg-tremor-background-subtle dark:text-dark-tremor-content-subtle dark:hover:bg-dark-tremor-background-subtle dark:hover:text-tremor-content"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close"
                    >
                        <RiCloseLine className="size-5" aria-hidden={true} />
                    </button>
                    <form action="#" method="POST" className="space-y-4">
                        <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Añade una nueva Area
                        </h4>
                        <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                            {/* Puedes añadir una descripción aquí si es necesario */}
                        </p>
                        <div className="flex flex-col p-[5%] space-y-6">
                            <div className="col-span-full sm:col-span-3 space-y-4">
                                <div>
                                    <SelectBoxArea
                                        id="area-select"
                                        Text="Seleccione un Area"
                                        options={area}
                                    />
                                </div>

                                <div>
                                    <Input2
                                        id="nombreArea"
                                        type="text"
                                        placeholder="Area"
                                        Text="Area:"
                                    />
                                </div>
                            </div>
                        </div>
                        <BotonSegundo text="Agregar" id="guardarBtn" />
                    </form>
                </DialogPanel>
            </Dialog>
        </>
    );
}
