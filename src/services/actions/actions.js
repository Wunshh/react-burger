import * as api from '../../utils/api';

const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
const ORDER_MODAL_OPEN = 'ORDER_MODAL_OPEN';
const INGREDIENT_MODAL_OPEN = 'INGREDIENT_MODAL_OPEN';
const MODAL_CLOSE = 'MODAL_CLOSE';

function getIngredientsData() {
    return function(dispatch) {
        api.getIngredientsData()
        .then((res) => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                allIngredients: res.data
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

const sendOrder = (itemsId) => {
    return function(dispatch) {
        api.sendOrder(itemsId) 
        .then((res) => {
            dispatch({
                type: SEND_ORDER_SUCCESS,
                order: res
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

export {
    GET_INGREDIENTS_SUCCESS,
    SEND_ORDER_SUCCESS,
    ORDER_MODAL_OPEN,
    INGREDIENT_MODAL_OPEN,
    MODAL_CLOSE,
    getIngredientsData,
    sendOrder
}