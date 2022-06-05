import { Middleware, MiddlewareAPI } from "redux";

import { AppDispatch, RootState  } from '../../utils/types';
import { TWsActions } from '../actions/wsActions';


export const socketMiddleware = (
    wsUrl: string, 
    wsActions: TWsActions
    ): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const {
                onInit,
                onOpen,
                onClose,
                onError,
                onGetOrders
            } = wsActions;

            if (type === onInit) {
                debugger
                wsUrl = payload;
                socket = new WebSocket(wsUrl);
            }

            
            if (socket) {
                
                socket.onopen = (event) => {
                    dispatch({ type: onOpen, payload: event});
                };
        
                socket.onerror = (event) => {
                    dispatch({ type: onError, payload: event });
                };
        
                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
                    dispatch({ type: onGetOrders, orders: restParsedData });
                };

                socket.onclose = (event) => {
                    dispatch({ type: onClose, payload: event });
                };
            }
            next(action);
        };
        
    }) as Middleware;
};