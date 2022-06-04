import { TIngredients, TOrder, TOrders } from '../../utils/types';

import {
    ORDER_MODAL_OPEN,
    INGREDIENT_MODAL_OPEN,
    ORDER_INGREDIENT_MODAL_OPEN,
    MODAL_CLOSE,
    TModalAction
} from '../actions/modal';

import {
    GET_INGREDIENTS_SUCCESS,
    TIngredientsAction
} from '../actions/ingredients';

import {
    SEND_ORDER_SUCCESS,
    SEND_ORDER_REQUEST,
    SEND_ORDER_FAILED,
    TOrderAction
} from '../actions/order';

import {
    ADD_ITEM,
    DELETE_ITEM,
    MOVE_ITEM,
    TConstructorAction
} from '../actions/constructor';

export type TReducersState = {
    allIngredients: Array<TIngredients>;
    constructorIngredients: Array<TIngredients>;
    ingredient: null | TIngredients;
    orderIngredient: null | TOrders;
    order: null | TOrder;
    ingredientModalOpen: boolean;
    orderModalOpen: boolean;
    orderIngredientModalOpen: boolean;
    visible: boolean;
    orederRequest: boolean;
    orderFailed: boolean;
};

const initialState: TReducersState = {
    allIngredients: [],
    constructorIngredients: [],
    ingredient: null,
    orderIngredient: null,
    order: null,
    ingredientModalOpen: false,
    orderModalOpen: false,
    orderIngredientModalOpen: false,
    visible: false,
    orederRequest: false,
    orderFailed: false
};

const ingredient = (state = initialState, action: TOrderAction | TConstructorAction | TIngredientsAction| TModalAction) => {
    switch (action.type) {
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                allIngredients: action.allIngredients,
            };
        }
        case ADD_ITEM: {
            const item = action.item.item;
            debugger;
            return {
                ...state,
                constructorIngredients: 
                    item.type === 'bun' ?
                        [...state.constructorIngredients].filter(item => item.type !== 'bun').concat(item)
                    : 
                        [...state.constructorIngredients, {...action.item}]
                ,

                allIngredients: item.type !== 'bun' ?
                [...state.allIngredients].map(m => (m.type !== 'bun' &&
                    m._id === item._id) ? { ...m, __v: ++m.__v } : m)
                :
                [...state.allIngredients].filter(m => 
                    m.type === 'bun').map(m => m._id === item._id ? 
                        {...m, __v: 1 } 
                        : 
                        {...m, __v: 0 }).concat(...state.allIngredients.filter(m => m.type !== "bun"))
            };
        }
        case DELETE_ITEM: {
            return {
                ...state,
                constructorIngredients: [
                    ...state.constructorIngredients.filter(item => item._id !== action.id, 0).concat(
                        ...state.constructorIngredients.filter(item => item._id === action.id, 0).slice(1)
                    )
                ],
                allIngredients: [...state.allIngredients].map(item => 
                    item._id === action.id ? { ...item, __v: --item.__v } : item
                )
            };
        }
        case MOVE_ITEM: {
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients].filter(item => 
                    item.type === 'bun').concat(action.newCards)
            }
        }
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                orederRequest: true,
                orderFailed: false
            }
        } 
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.order,
                constructorIngredients: [],
                allIngredients: [...state.allIngredients].map(item => 
                    item && { ...item, __v: 0}
                ),
                orederRequest: false,
                orderFailed: false
            };
        }
        case SEND_ORDER_FAILED: {
            return {
                ...state,
                order: {...initialState.order},
                allIngredients: {...initialState.allIngredients},
                orederRequest: false,
                orderFailed: true
            }
        }
        case ORDER_MODAL_OPEN: {
            return {
                ...state,
                orderModalOpen: true,
                visible: true
            };
        }
        case MODAL_CLOSE: {
            return {
                ...state,
                order: null,
                orederRequest: false,
                orderFailed: false,
                orderIngredientModalOpen: false
            }
        }
        case INGREDIENT_MODAL_OPEN: {
            return {
                ...state,
                ingredientModalOpen: true,
                visible: true,
                ingredient: action.item
            };
        }
        case ORDER_INGREDIENT_MODAL_OPEN: {
            return {
                ...state,
                orderIngredientModalOpen: true,
                visible: true,
                orderIngredient: action.item
            };
        }
        default: {
            return state
        }
    } 
}

export { 
    ingredient
}