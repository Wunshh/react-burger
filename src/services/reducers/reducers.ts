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

export type TReduserAction = 
| TOrderAction 
| TConstructorAction 
| TIngredientsAction
| TModalAction

export type TReducersState = {
    allIngredients: Array<TIngredients>;
    constructorIngredients: Array<TIngredients>;
    ingredient: null | TIngredients;
    orderIngredient: null | TOrders;
    order: null | TOrder;
    ingredientModalOpen: boolean;
    orderModalOpen: boolean;
    orderIngredientModalOpen: boolean;
    orederRequest: boolean;
    orderFailed: boolean;
};

export const initialState: TReducersState = {
    allIngredients: [],
    constructorIngredients: [],
    ingredient: null,
    orderIngredient: null,
    order: null,
    ingredientModalOpen: false,
    orderModalOpen: false,
    orderIngredientModalOpen: false,
    orederRequest: false,
    orderFailed: false
};

const ingredient = (state = initialState, action: TReduserAction): TReducersState => {
    switch (action.type) {
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                allIngredients: action.allIngredients,
            };
        }
        case ADD_ITEM: {            
            const uuid = action.uuid;
            return {
                ...state,
                constructorIngredients: 
                    action.item.type === 'bun' ?
                        [...state.constructorIngredients].filter(item => item.type !== 'bun').concat(action.item)
                    : 
                        [...state.constructorIngredients, {...action.item, uuid}]
                ,

                allIngredients: action.item.type !== 'bun' ?
                [...state.allIngredients].map(item => 
                    item._id === action.item._id && action.item.type !== 'bun' ? { ...item, __v: ++item.__v } : item)
                :
                [...state.allIngredients].filter(item => 
                    item.type === 'bun').map(item => item._id === action.item._id ? 
                        {...item, __v: 1 } 
                        : 
                        {...item, __v: 0 }).concat(...state.allIngredients.filter(item => item.type !== "bun"))
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
                order: null,
                allIngredients: [...initialState.allIngredients],
                orederRequest: false,
                orderFailed: true
            }
        }
        case ORDER_MODAL_OPEN: {
            return {
                ...state,
                orderModalOpen: true
            };
        }
        case MODAL_CLOSE: {
            return {
                ...state,
                order: null,
                orederRequest: false,
                orderFailed: false,
                orderIngredientModalOpen: false,
                ingredient: null,
                ingredientModalOpen: false,
                orderIngredient: null,
            }
        }
        case INGREDIENT_MODAL_OPEN: {
            return {
                ...state,
                ingredientModalOpen: true,
                ingredient: action.item
            };
        }
        case ORDER_INGREDIENT_MODAL_OPEN: {
            return {
                ...state,
                orderIngredientModalOpen: true,
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