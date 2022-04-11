import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalHeader from '../modal-header/modal-header';

import modalStyle from './modal.module.css';


const Modal = ({children, header, onClose, onKeyDown}) => {

  const visible = useSelector(store => store.ingredient.visible);
  const modalRoot = document.getElementById("react-modals"); 

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return() => {
      document.removeEventListener('keydown', onKeyDown);
    }
  }, [onKeyDown]);
  
  return createPortal (
    <div className={`${modalStyle.invisible} ${visible ? modalStyle.visible : ''}`}>
      <div className={modalStyle.modal}>
        <ModalHeader header={header} onClose={onClose}/>
        {children}
      </div>
      <ModalOverlay onClose={onClose}/>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
}

export default Modal;