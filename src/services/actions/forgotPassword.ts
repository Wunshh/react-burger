import * as api from '../../utils/api';
import { AppDispatch, AppThunk } from '../../utils/types';

const FORGOT_FORM_SET_VALUE: 'FORGOT_FORM_SET_VALUE' = 'FORGOT_FORM_SET_VALUE';
const POST_FORGOT_FORM_SUBMIT: 'POST_FORGOT_FORM_SUBMIT' = 'POST_FORGOT_FORM_SUBMIT';
const POST_FORGOT_FORM_SUCCESS: 'POST_FORGOT_FORM_SUCCESS' = 'POST_FORGOT_FORM_SUCCESS';
const POST_FORGOT_FORM_FAILED: 'POST_FORGOT_FORM_FAILED' = 'POST_FORGOT_FORM_FAILED';

export interface IForgotFormSetValueAction {
    readonly type: typeof FORGOT_FORM_SET_VALUE;
    field: string;
    value: string;
}

export interface IPostForgotFormSubmitAction {
    readonly type: typeof POST_FORGOT_FORM_SUBMIT;
}

export interface IPostForgotFormSuccessAction {
    readonly type: typeof POST_FORGOT_FORM_SUCCESS;
    readonly res: boolean;
}

export interface IPostForgotFormFailedAction {
    readonly type: typeof POST_FORGOT_FORM_FAILED;
}

export type TForgotFormAction = 
| IForgotFormSetValueAction
| IPostForgotFormSubmitAction
| IPostForgotFormSuccessAction
| IPostForgotFormFailedAction

const postForgotFormSubmitAction = (): IPostForgotFormSubmitAction => ({
    type: POST_FORGOT_FORM_SUBMIT
});

const postForgotFormSuccessAction = (res: boolean): IPostForgotFormSuccessAction => ({
    type: POST_FORGOT_FORM_SUCCESS,
    res
});

const setForgotFormValue = (field: string, value: string): IForgotFormSetValueAction => ({
    type: FORGOT_FORM_SET_VALUE,
    field,
    value
});

function catchFetchError(): IPostForgotFormFailedAction {
    return {
        type: POST_FORGOT_FORM_FAILED
    };
}

const forgotPassword: AppThunk = (email: string) => {
    return function(dispatch: AppDispatch) {
        dispatch(postForgotFormSubmitAction());
        api.forgotPassword(email) 
        .then((res) => {
            if (res) {
                dispatch(postForgotFormSuccessAction(res.success)); 
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
    FORGOT_FORM_SET_VALUE,
    POST_FORGOT_FORM_SUBMIT,
    POST_FORGOT_FORM_SUCCESS,
    POST_FORGOT_FORM_FAILED,
    setForgotFormValue,
    forgotPassword
}