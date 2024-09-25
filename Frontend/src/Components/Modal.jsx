import PropTypes from 'prop-types';
import checkmarkImg from '../../public/Img/checkmark.png';

const Modal = ({ Text, isOpen, onClose }) => {
  if (!isOpen) return null; // No renderiza si no está abierto

  return (
    <div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-[#B9B9B9] bg-opacity-70">
      <div className="bg-white rounded shadow-lg w-96 max-[768px]:w-[20rem]">
        <div className="border-b px-4 py-2 flex justify-end items-center">
          <button className="text-black" onClick={onClose}>
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div className="border-b px-4 py-2 flex flex-col justify-center items-center">
          <span>{Text}</span>
          <img src={checkmarkImg} alt="Checkmark" />
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  Text: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
