import { useDispatch } from 'react-redux';

import { MODAL_CLOSE } from '../../services/actions/actions';

import overlayStyle from './modal-overlay.module.css';


function ModalOverlay() {
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch({type: MODAL_CLOSE})
    }

    return (
        <div className={overlayStyle.overlay} onClick={onClose}/>
    );
}

export default ModalOverlay;