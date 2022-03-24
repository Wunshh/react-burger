import { createPortal } from 'react-dom';
import modalStyle from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { modalRoot } from '../../utils/data';
import ModalHeader from '../modal-header/modal-header';
import { useEffect } from 'react';

const Modal = ({children, header, visible, onClose, onKeyDown}) => {

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return() => {
      document.removeEventListener('keydown', onKeyDown);
    }
  }, [onKeyDown]);
  
  return createPortal (
    <div className={[modalStyle.invisible], visible && [modalStyle.visible]}>
      <div className={modalStyle.modal}>
        <ModalHeader header={header} visible={visible} onClose={onClose}/>
        {children}
      </div>
      <ModalOverlay visible={visible} onClose={onClose}/>
    </div>,
    modalRoot
  );
}



export default Modal;
