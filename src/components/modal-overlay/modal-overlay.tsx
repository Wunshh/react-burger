import { FC } from 'react';

import overlayStyle from './modal-overlay.module.css';

interface IModal {
    onClose: () => void;
};

const ModalOverlay: FC<IModal> = ({ onClose }) => {
    return (
        <div className={overlayStyle.overlay} onClick={onClose}/>
    );
}

export default ModalOverlay;