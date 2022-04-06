import * as api from '../../utils/api';

const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';

const sendOrder = (itemsId) => {
    return function(dispatch) {
        api.sendOrder(itemsId) 
        .then((res) => {
            dispatch({
                type: SEND_ORDER_SUCCESS,
                order: res
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

export {
    SEND_ORDER_SUCCESS,
    sendOrder
}