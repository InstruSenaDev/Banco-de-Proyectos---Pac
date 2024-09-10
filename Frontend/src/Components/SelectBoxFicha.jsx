import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SelectBoxFicha = ({ id, text, value, onChange }) => {
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/ficha');
        const data = await response.json();
        setFichas(data);
      } catch (error) {
        console.error('Error al obtener las fichas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFichas();
  }, []);

  return (
    <div className="">
      <label htmlFor={id} className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {text}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#F5F6FA] w-full min-h-6 mt-3 rounded-[4px] border border-[#D5D5D5] px-[20px] py-[7px] mb-2 text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong"
        disabled={loading}
      >
        <option value="">Elige una ficha</option>
        {fichas.map((ficha) => (
          <option key={ficha.id} value={ficha.id}>
          {`${ficha.nombre} - ${ficha.numeroficha}`}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectBoxFicha.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectBoxFicha;