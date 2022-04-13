import PropTypes from 'prop-types';

import overlayStyle from './modal-overlay.module.css';

function ModalOverlay({ onClose }) {
    return (
        <div className={overlayStyle.overlay} onClick={onClose}/>
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func
}

export default ModalOverlay;