import { Middleware, MiddlewareAPI } from "redux";

import { AppDispatch, RootState  } from '../../utils/types';
import { TWsActions } from '../actions/wsActions';


export const createSocketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const {
                wsInit,
                onOpen,
                onClose,
                onError,
                onGetOrders
            } = wsActions;

            if (type === wsInit) {
                wsUrl = payload;
                socket = new WebSocket(wsUrl);
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };
        
                socket.onerror = () => {
                    dispatch({ type: onError });
                };
        
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
            
                    dispatch({ type: onGetOrders, payload: restParsedData });
                };

                socket.onclose = () => {
                    dispatch({ type: onClose });
                };
        
                socket.onclose = () => {
                    dispatch({ type: onClose });
                };
            }
            next(action);
        };
    };
};