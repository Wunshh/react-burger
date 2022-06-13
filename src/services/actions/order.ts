import * as api from '../../utils/api';
import { AppDispatch, AppThunk, TOrder } from '../../utils/types';

const SEND_ORDER_SUCCESS: 'SEND_ORDER_SUCCESS' = 'SEND_ORDER_SUCCESS';
const SEND_ORDER_REQUEST: 'SEND_ORDER_REQUEST' = 'SEND_ORDER_REQUEST';
const SEND_ORDER_FAILED: 'SEND_ORDER_FAILED' = 'SEND_ORDER_FAILED';

export interface ISendOrderSuccessAction {
    readonly type: typeof SEND_ORDER_SUCCESS;
    readonly order: TOrder
}
export interface ISendOrderRequestAction {
    readonly type: typeof SEND_ORDER_REQUEST 
}

export interface ISendOrderFaildAction {
    readonly type: typeof SEND_ORDER_FAILED
}

export type TOrderAction =
| ISendOrderSuccessAction
| ISendOrderRequestAction
| ISendOrderFaildAction

function catchFetchError() {
    return {
        type: SEND_ORDER_FAILED
    };
}

const sendOrder: AppThunk = (itemsId: Array<string>) => {
    return function(dispatch: AppDispatch) {
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