import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalHeader from '../modal-header/modal-header';

import modalStyle from './modal.module.css';


const Modal = ({children, header, visible, onClose, onKeyDown}) => {

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
        <ModalHeader header={header} visible={visible} onClose={onClose}/>
        {children}
      </div>
      <ModalOverlay visible={visible} onClose={onClose}/>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onKeyDown: PropTypes.func
}

export default Modal;