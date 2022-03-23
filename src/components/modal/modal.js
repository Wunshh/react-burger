import modalStyle from './modal.module.css';
import { modalRoot } from '../../utils/data';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { 
    CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = () => {
    return createPortal (
        <>
            <div className={modalStyle.card}>
                <h2 
                    className="text text_type_main-default"
                >
                    Детали ингридиента
                </h2>
                <CloseIcon type="primary" />
                {children}
                <ModalOverlay />
            </div>
        </>,
        modalRoot
    );
}

export default Modal;