import overlayStyle from './modal-overlay.module.css';

function ModalOverlay({onClose}) {
    return (
        <div className={overlayStyle.overlay} onClick={onClose}/>
    );
}

export default ModalOverlay;