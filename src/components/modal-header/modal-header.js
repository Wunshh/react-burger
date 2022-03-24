import modalHeaderStyle from './modal-header.module.css';
import { 
    CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

function ModalHeader({ header, visible, onClose}) {
    return (
        visible &&
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