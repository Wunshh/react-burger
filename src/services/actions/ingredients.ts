import * as api from '../../utils/api';
import { AppDispatch, AppThunk, TIngredients } from '../../utils/types';

const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export interface IGetIngredientSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly allIngredients: ReadonlyArray<TIngredients>;
}

export interface IGetIngredientRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsAction = 
| IGetIngredientSuccess
| IGetIngredientRequest
| IGetIngredientFailed


const getIngredientRequest = (): IGetIngredientRequest => ({
    type: GET_INGREDIENTS_REQUEST
});

const getIngredientSuccess = (allIngredients: ReadonlyArray<TIngredients>): IGetIngredientSuccess => ({
    type: GET_INGREDIENTS_SUCCESS,
    allIngredients
})

function catchFetchError(): IGetIngredientFailed {
    return {
        type: GET_INGREDIENTS_FAILED
    };
}

const getIngredientsData: AppThunk = () => {
    return function(dispatch: AppDispatch) {
        dispatch(getIngredientRequest());
        api.getIngredientsData()
        .then((res) => {
            if (res) {
                dispatch(getIngredientSuccess(res.data));
            } else {
                dispatch(
                    catchFetchError()
                );
            }
        })
        .catch((err) => {
            dispatch(
                catchFetchError()
            );
            console.log(err);
        });
    }
}

export {
    GET_INGREDIENTS_SUCCESS,
    getIngredientsData
}