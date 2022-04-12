import PropTypes from 'prop-types';
import { 
    CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import modalHeaderStyle from './modal-header.module.css';

function ModalHeader({ header, onClose }) {

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

ModalHeader.propTypes = {
    header: PropTypes.string,
    onClose: PropTypes.func
}

export default ModalHeader;