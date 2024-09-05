import PropTypes from 'prop-types';

const Layoutcontenido3 = ({ title, children }) => {
  return (
    <>
      <div className="text-center px-20 mt-[1%]">
        <span className="text-2xl font-bold font-josefin-slab text-center">
          {title}
        </span>
      </div>

      <main className="flex justify-center h-[100vh] max-[768px]:h-[100%]">
        <div className="flex-wrap w-[78%] max-[768px]:w-[70%] mt-[1%] h-[85%] bg-white rounded-lg border-none border-Borde_gris flex items-center absolute justify-center">
          <div className="flex flex-wrap justify-center w-[90%]">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

Layoutcontenido3.propTypes = {
  title: PropTypes.string, // 'title' es opcional, por lo que no se marca como requerido
  children: PropTypes.node.isRequired, // 'children' es requerido
};


export default Layoutcontenido3;
