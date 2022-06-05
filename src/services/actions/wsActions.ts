import { TListOrders } from '../../utils/types';

export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const WS_CONNECTING: 'WS_CONNECTING' = 'WS_CONNECTING';
export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR
}

export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
}

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWsGetOrders {
    readonly type: typeof WS_GET_ORDERS,
    readonly orders: TListOrders
}

export type TActions = 
    | IWsConnectionClosed
    | IWsConnectionError
    | IWsConnectionStart
    | IWsConnectionSuccess
    | IWsGetOrders

export const wsConnectionClosed = (): IWsConnectionClosed => {
    return {
      type: WS_CONNECTION_CLOSED
    };
};

export const wsConnectionError = (): IWsConnectionError => {
    return {
      type: WS_CONNECTION_ERROR
    };
};

export const wsConnectionStart = (payload: string): IWsConnectionStart => {
    return {
        type: WS_CONNECTION_START,
        payload
    }
}

export const wsConnectionSuccess = (): IWsConnectionSuccess => {
    return {
      type: WS_CONNECTION_SUCCESS
    };
};
  
export const wsGetOrders = (orders: TListOrders): IWsGetOrders => {
    return {
      type: WS_GET_ORDERS,
      orders
    };
};

export type TWsActions = {
    onInit: typeof WS_CONNECTION_START;
    onOpen: typeof WS_CONNECTION_SUCCESS;
    onClose: typeof WS_CONNECTION_CLOSED;
    onError: typeof WS_CONNECTION_ERROR;
    onGetOrders: typeof WS_GET_ORDERS;
};

export const wsActions: TWsActions = {
    onInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onGetOrders: WS_GET_ORDERS,
};