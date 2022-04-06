import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalHeader from '../modal-header/modal-header';
import { MODAL_CLOSE } from '../../services/actions/modal';

import modalStyle from './modal.module.css';


const Modal = ({children, header}) => {

  const visible = useSelector(store => store.modal.visible);
  const dispatch = useDispatch();
  const modalRoot = document.getElementById("react-modals"); 

  const onKeyDown = useCallback(
    (evt) => {
      if (evt.key === 'Escape') {
        dispatch({
          type: MODAL_CLOSE
        });
      }
    }, [dispatch]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return() => {
      document.removeEventListener('keydown', onKeyDown);
    }
  }, [onKeyDown]);
  
  return createPortal (
    <div className={`${modalStyle.invisible} ${visible ? modalStyle.visible : ''}`}>
      <div className={modalStyle.modal}>
        <ModalHeader header={header} />
        {children}
      </div>
      <ModalOverlay />
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
}

export default Modal;