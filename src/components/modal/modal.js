import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalHeader from '../modal-header/modal-header';

import modalStyle from './modal.module.css';


const Modal = ({children, header, onClose}) => {

  const visible = useSelector(store => store.ingredient.visible);
  const modalRoot = document.getElementById("react-modals"); 

  const handleModalCloseKeyDown = useCallback((evt) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  }, [onClose]);


  useEffect(() => {
    document.addEventListener('keydown', handleModalCloseKeyDown);

    return() => {
      document.removeEventListener('keydown', handleModalCloseKeyDown);
    }
  }, [handleModalCloseKeyDown]);
  
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
  onClose: PropTypes.func
}

export default Modal;