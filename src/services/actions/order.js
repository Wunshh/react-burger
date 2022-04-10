import * as api from '../../utils/api';

const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

const sendOrder = (itemsId) => {
    return function(dispatch) {
        dispatch({
            type: SEND_ORDER_REQUEST
        });
        api.sendOrder(itemsId) 
        .then((res) => {
            if (res) {
                dispatch({
                    type: SEND_ORDER_SUCCESS,
                    order: res
                }); 
            } else {
                dispatch({
                    type: SEND_ORDER_FAILED
                });
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: SEND_ORDER_FAILED
            });
        });
    }
}

export {
    SEND_ORDER_SUCCESS,
    sendOrder
}