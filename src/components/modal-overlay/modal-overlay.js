import overlayStyle from './modal-overlay.module.css';

function ModalOverlay({visible, onClose}) {
    return (
        visible && <div className={overlayStyle.overlay} onClick={onClose}/>
    );
}

export default ModalOverlay;