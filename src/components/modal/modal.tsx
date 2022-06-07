import { useEffect, useCallback, FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalHeader from '../modal-header/modal-header';

import modalStyle from './modal.module.css';

interface IModal {
  children: ReactNode;
  header?: string;
  onClose: () => void;
};

const Modal: FC<IModal> = ({children, header, onClose}) => {

  const modalRoot = document.getElementById("react-modals"); 
  
  const handleModalCloseKeyDown = useCallback((evt: KeyboardEvent) => {
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
    <>
      <div className={modalStyle.modal}>
        <ModalHeader header={header} onClose={onClose}/>
        {children}
      </div>
      <ModalOverlay onClose={onClose}/>
    </>,
    modalRoot as HTMLElement
  );
}

export default Modal;