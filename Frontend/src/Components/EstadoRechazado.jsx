import React from 'react';
import '../Style/Rechazado.css'; // Si usas un archivo CSS externo para los estilos

const EstadoRechazado = () => {
  return (
    <label class="flex justify-center items-center p-2 gap-2 h-8 w-28 border border-[#FF342B] bg-[#ff362b34] rounded-sm  hover:bg-[#ff362b52]">
        <span class="text-[#FF342B] text-base  font-semibold">Rechazado</span>
    </label>
  );
}

export default EstadoRechazado;
;
