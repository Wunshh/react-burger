import { AnyAction } from 'redux'; 
import { initialState } from './wsReduser';
import { wsReduser } from './wsReduser';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
} from '../actions/wsActions';


describe('Тест wsReduser', () => {

    // const order = [
    //     orders: [
    //         {
    //             "_id": "62aa0688fa747e001bd526bb",
    //             "ingredients": [
    //                 "60d3b41abdacab0026a733c7",
    //                 "60d3b41abdacab0026a733cf",
    //                 "60d3b41abdacab0026a733cb",
    //                 "60d3b41abdacab0026a733d3",
    //                 "60d3b41abdacab0026a733c7"
    //             ],
    //             "status": "done",
    //             "name": "Антарианский экзо-плантаго флюоресцентный био-марсианский бургер",
    //             "createdAt": "2022-06-15T16:19:20.588Z",
    //             "updatedAt": "2022-06-15T16:19:21.046Z",
    //             "number": 17686
    //         }
    //     ],
    //     total: 17648,
    //     totalToday: 164
    // ];

    const order = {
        _id: "62aa0688fa747e001bd526bb",
        ingredients: [
        "60d3b41abdacab0026a733c7"
        ],
        status: "done",
        name: "Антарианский экзо-плантаго флюоресцентный био-марсианский бургер",
        createdAt: "2022-06-15T16:19:20.588Z",
        updatedAt: "2022-06-15T16:19:21.046Z",
        number: 17686
    };

    const orders = {
        orders: [order],
        total: 0,
        totalToday: 0
    }

    it('Вернуть initialState', () => {
        expect(wsReduser(undefined, {} as AnyAction)).toEqual(initialState);
    });

    it('Проверить WS_CONNECTION_SUCCESS', () => {
        expect(wsReduser({
            ...initialState
        }, {
            type: WS_CONNECTION_SUCCESS
        })).toEqual({
            ...initialState,
            wsConnect: true
        })
    });

    it('Проверить WS_CONNECTION_ERROR', () => {
        expect(wsReduser(initialState, {
            type: WS_CONNECTION_ERROR
        })).toEqual({
            ...initialState,
            wsConnect: false
        })
    });

    it('Проверить WS_CONNECTION_CLOSED', () => {
        expect(wsReduser(initialState, {
            type: WS_CONNECTION_CLOSED
        })).toEqual({
            ...initialState,
            wsConnect: false
        })
    }); 

    it('Проверить WS_GET_ORDERS', () => {
        expect(wsReduser({
            ...initialState
        }, {
            type: WS_GET_ORDERS,
            orders
        })).toEqual({
            ...initialState,
            orders: [order],
            total: 0,
            totalToday: 0
        })
    });
});