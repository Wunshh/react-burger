import * as api from '../../utils/api';

const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

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

export {
    GET_INGREDIENTS_SUCCESS,
    getIngredientsData
}