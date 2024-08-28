// CardProject.jsx
import React from 'react';
import BotonSegundo from './BotonSegundo'; // Ajusta la ruta si es necesario
import '../styles/CardProject';

const CardProject = ({ Text }) => {
    return (
        <>

            <div className="w-full h-60 bg-[#FBFCFF] rounded-xl border-2 border-[#FBFCFF] shadow-lg flex flex-col items-center justify-center absolute p-8 m-8 hover:border-[#A3E784] transition duration-300 max-[768px]:m-1">
                <h2 className="text-2xl md:text-2xl mb-4 text-center leading-tight p-4 font-bold">
                    {Text}
                </h2>
                <div className="w-full md:w-auto text-sm md:text-base flex justify-center">
                    <BotonSegundo Text="Ver informe" />
                </div>
            </div>

        </>

    );
};

export default CardProject;