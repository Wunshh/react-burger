import {
    ORDER_MODAL_OPEN,
    INGREDIENT_MODAL_OPEN,
    MODAL_CLOSE
} from '../actions/modal';

import {
    GET_INGREDIENTS_SUCCESS
} from '../actions/ingredients';

import {
    SEND_ORDER_SUCCESS
} from '../actions/order';

import {
    ADD_ITEM,
    DELETE_ITEM,
    MOVE_ITEM
} from '../actions/constructor';

const initialState = {
    allIngredients: [],
    constructorIngredients: [],
    ingredient: null,
    order: null,
    ingredientModalOpen: false,
    orderModalOpen: false,
    visible: false
};

const ingredient = (state = initialState, action) => {
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
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.order,
                constructorIngredients: [],
                allIngredients: [...state.allIngredients].map(item => 
                    item && { ...item, __v: 0}
                )
            };
        }
        case ORDER_MODAL_OPEN: {
            return {
                ...state,
                orderModalOpen: true,
                visible: true
            };
        }
        case INGREDIENT_MODAL_OPEN: {
            return {
                ...state,
                ingredientModalOpen: true,
                visible: true,
                ingredient: action.item
            };
        }
        case MODAL_CLOSE:  {
            return {
                ...state,
                orderModalOpen: false,
                visible: false,
                order: null,
                ingredient: null,
                ingredientModalOpen: false,
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