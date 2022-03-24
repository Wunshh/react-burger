import orderDetailsStyle from './order-details.module.css';
import Modal from '../modal/modal';
import odrerModalImg from '../../images/graphics.png';

function OrderDetails({visible, onKeyDown, onClose}) {
    return (
        <Modal 
            visible={visible}
            onKeyDown={onKeyDown} 
            onClose={onClose}
        >
            <div className={orderDetailsStyle.container}>
                <h3 
                    className="text text_type_digits-large" 
                    style={{textShadow:  "0px 0px 16px rgba(51, 51, 255, 0.25), 0px 0px 8px rgba(51, 51, 255, 0.25), 0px 4px 32px rgba(51, 51, 255, 0.5)"}}
                    > 
                    034536
                </h3>
                <p className="text text_type_main-medium mt-8 mb-15">
                    идентификатор заказа
                </p>
                <img src={odrerModalImg} alt="заказ принят" className="mb-15"/>
                <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive mb-15">Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    );
}

export default OrderDetails;