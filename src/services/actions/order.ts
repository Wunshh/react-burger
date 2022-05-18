import * as api from '../../utils/api';

const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

function catchFetchError() {
    return {
        type: SEND_ORDER_FAILED
    };
}

const sendOrder = (itemsId: Array<string>) => {
    return function(dispatch: any) {
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
                dispatch(
                    catchFetchError()
                );
            }
        })
        .catch((err) => {
            dispatch(
                catchFetchError()
            );
            console.log(err);
        });
    }
}

export {
    SEND_ORDER_SUCCESS,
    SEND_ORDER_REQUEST,
    SEND_ORDER_FAILED,
    sendOrder
}