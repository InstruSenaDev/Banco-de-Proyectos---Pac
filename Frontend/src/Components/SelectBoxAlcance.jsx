import PropTypes from 'prop-types';


const SelectBoxAlcance = ({ id, Text, options, value, onChange, error }) => {
  return (
      <div>
          <label htmlFor={id}>{Text}</label>
          <select id={id} value={value} onChange={onChange} className={`bg-[#F5F6FA] w-full min-h-6 mt-3 rounded-[4px] border px-[20px] py-[7px] mb-2 text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong ${error ? 'border-red-500' : 'border-[#D5D5D5]'}`}>
              <option value="">Seleccione una categoría</option>
              {options.map(option => (
                  <option key={option.idcategoriasalcance} value={option.idcategoriasalcance}>
                      {option.categoria}
                  </option>
              ))}
          </select>
          {error && <p className="text-red-500">{error}</p>} {/* Mostrar mensaje de error aquí */}
      </div>
  );
};
SelectBoxAlcance.propTypes = {
    Text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        idcategoriasalcance: PropTypes.number.isRequired,
        categoria: PropTypes.string.isRequired
    })).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};


export default SelectBoxAlcance;
