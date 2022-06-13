import * as api from '../../utils/api';
import { AppDispatch, AppThunk } from '../../utils/types';

const RESET_FORM_SET_VALUE: 'RESET_FORM_SET_VALUE' = 'RESET_FORM_SET_VALUE';
const POST_RESET_FORM_SUBMIT: 'POST_RESET_FORM_SUBMIT' = 'POST_RESET_FORM_SUBMIT';
const POST_RESET_FORM_SUCCESS: 'POST_RESET_FORM_SUCCESS' = 'POST_RESET_FORM_SUCCESS';
const POST_RESET_FORM_FAILED: 'POST_RESET_FORM_FAILED' = 'POST_RESET_FORM_FAILED';

export interface IResetFormSetValueAction {
    readonly type: typeof RESET_FORM_SET_VALUE;
    field: string;
    value: string
}

export interface IPostResetFormSubmitAction {
    readonly type: typeof POST_RESET_FORM_SUBMIT;
}

export interface IPostResetFormSuccessAction {
    readonly type: typeof POST_RESET_FORM_SUCCESS;
}

export interface IPostResetFormFaildAction {
    readonly type: typeof POST_RESET_FORM_FAILED;
}

export type TResetAction = 
| IResetFormSetValueAction
| IPostResetFormSubmitAction
| IPostResetFormSuccessAction
| IPostResetFormFaildAction

const setResetFormValue = (field: string, value: string) => ({
    type: RESET_FORM_SET_VALUE,
    field,
    value
});

function catchFetchError() {
    return {
        type: POST_RESET_FORM_FAILED 
    };
}

const reset: AppThunk = (password: string, token: string) => {
    
    return function(dispatch: AppDispatch) {
        dispatch({
            type: POST_RESET_FORM_SUBMIT
        });
        api.reset(password, token) 
        .then((res) => {
            if (res) {
                dispatch({
                    type: POST_RESET_FORM_SUCCESS,
                }); 
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
    RESET_FORM_SET_VALUE,
    POST_RESET_FORM_SUBMIT,
    POST_RESET_FORM_SUCCESS,
    POST_RESET_FORM_FAILED,
    setResetFormValue,
    reset
}