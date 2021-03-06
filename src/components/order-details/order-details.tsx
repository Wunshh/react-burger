import { useSelector } from '../../utils/hooks';

import odrerModalImg from '../../images/graphics.png';

import orderDetailsStyle from './order-details.module.css';


function OrderDetails() {

    const orderDetails = useSelector((store) => store.ingredient.order);
    
    return (
        orderDetails !== null ?
        <div className={orderDetailsStyle.container}>
            <h3 className="text text_type_digits-large text-shadow"> 
                {orderDetails.order.number}
            </h3>
            <p className="text text_type_main-medium mt-8 mb-15">
                идентификатор заказа
            </p>
            <img src={odrerModalImg} alt="заказ принят" className="mb-15"/>
            <p className="text text_type_main-default mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive mb-15">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
        :
        null
    );
}

export default OrderDetails;