import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { 
    CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import { MODAL_CLOSE } from '../../services/actions/modal';

import modalHeaderStyle from './modal-header.module.css';

function ModalHeader({ header }) {
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch({type: MODAL_CLOSE})
    }

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
    header: PropTypes.string
}

export default ModalHeader;