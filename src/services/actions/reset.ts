import * as api from '../../utils/api';

const RESET_FORM_SET_VALUE = 'RESET_FORM_SET_VALUE';
const POST_RESET_FORM_SUBMIT = 'POST_RESET_FORM_SUBMIT';
const POST_RESET_FORM_SUCCESS = 'POST_RESET_FORM_SUCCESS';
const POST_RESET_FORM_FAILED = 'POST_RESET_FORM_FAILED';

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

export type IResetAction = 
| IResetFormSetValueAction
| IPostResetFormSubmitAction
| IPostResetFormSuccessAction
| IPostResetFormFaildAction

const setResetFormValue = (field: string, value: string): IResetFormSetValueAction => ({
    type: RESET_FORM_SET_VALUE,
    field,
    value
});

const postResetFormSubmitAction = (): IPostResetFormSubmitAction => ({
    type: POST_RESET_FORM_SUBMIT 
});

const postResetFormSuccessAction = (): IPostResetFormSuccessAction => ({
    type: POST_RESET_FORM_SUCCESS
});


function catchFetchError(): IPostResetFormFaildAction {
    return {
        type: POST_RESET_FORM_FAILED 
    };
}

const reset = (password: string, token: string) => {
    
    return function(dispatch: any) {
        dispatch(postResetFormSubmitAction());
        api.reset(password, token) 
        .then((res) => {
            if (res) {
                dispatch(postResetFormSuccessAction()); 
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