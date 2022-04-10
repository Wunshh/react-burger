import * as api from '../../utils/api';

const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

function getIngredientsData() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        api.getIngredientsData()
        .then((res) => {
            if (res) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    allIngredients: res.data
                })
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: GET_INGREDIENTS_FAILED
            });
        });
    }
}

export {
    GET_INGREDIENTS_SUCCESS,
    getIngredientsData
}