
import React from 'react';

const SelectBox = ({ areas, onChange }) => {
    return (
        <select onChange={(e) => onChange(e.target.value)} defaultValue="">
            <option value="" disabled>Seleccione un área</option>
            {areas.map(area => (
                <option key={area.id} value={area.id}>{area.nombre}</option>
            ))}
        </select>
    );
};

export default SelectBox;