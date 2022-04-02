import {
    GET_INGREDIENTS_SUCCESS,
    SEND_ORDER_SUCCESS,
    ORDER_MODAL_OPEN,
    INGREDIENT_MODAL_OPEN,
    MODAL_CLOSE
} from '../actions/actions';


const initialState = {
    allIngredients: [],
    constructorIngredients: null,
    ingredient: null,
    order: null,
    ingredientModalOpen: false,
    orderModalOpen: false,
    visible: false
};

const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                allIngredients: action.allIngredients
            };
        }
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.order,
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
                ingredientModalOpen: false
            };
        }
        default: {
            return state
        }
    } 
}

export default burgerReducer;