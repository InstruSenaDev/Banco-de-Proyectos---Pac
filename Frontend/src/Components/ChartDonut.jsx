import { DonutChart } from '@tremor/react';
import PropTypes from 'prop-types'; // Asegúrate de importar PropTypes si usas validación de props.

const dataFormatter = (number) => `$ ${Intl.NumberFormat('us').format(number)}`;

const ChartDonut = ({ data }) => {
  return (
    <div className="mx-auto space-y-12">
      {/* Donut Chart */}
        <div className="flex justify-center py-2">
          <DonutChart
            data={data}
            variant="donut"
            valueFormatter={dataFormatter}
            onValueChange={(value) => console.log(value)}
            colors={["yellow", "red", "indigo", "blue", "green"]}
          />
        </div>
      </div>
  );
};

// Validación de las props
ChartDonut.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ChartDonut;
