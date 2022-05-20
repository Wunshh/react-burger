import { FC } from 'react';
import { 
    CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import modalHeaderStyle from './modal-header.module.css';

interface IModal {
    header?: string;
    onClose: () => void;
};

const ModalHeader: FC<IModal> = ({ header, onClose }) => {

    return (
        <div className={modalHeaderStyle.head}>
            <h2 className="text text_type_main-large">
                {header}
            </h2>
            <div className={modalHeaderStyle.button}>
                <CloseIcon type="primary" onClick={onClose}/>
            </div>
        </div>
    );
}

export default ModalHeader;