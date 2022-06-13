import { TOrders } from '../../utils/types';

import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
    TActions
} from '../actions/wsActions';

export type TWsState = {
    wsConnect: boolean;
    orders: Array<TOrders>;
    total: number;
    totalToday: number;
}

const initialState: TWsState  = {
    wsConnect: false,
    orders: [],
    total: 0,
    totalToday: 0
}

const wsReduser = (state = initialState, action: TActions): TWsState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS: {
            
            return {
                ...state,
                wsConnect: true
            }
        }
        case WS_CONNECTION_ERROR: {
            
            return {
                ...state,
                wsConnect: false
            }
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                wsConnect: false
            }
        }
        case WS_GET_ORDERS: {
            return {
                ...state,
                orders: action.orders.orders,
                total: action.orders.total,
                totalToday: action.orders.totalToday
            }
        }
        default: {
            return state;
        }
    }
}

export {
    wsReduser
};