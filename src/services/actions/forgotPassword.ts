import * as api from '../../utils/api';

const FORGOT_FORM_SET_VALUE = 'FORGOT_FORM_SET_VALUE';
const POST_FORGOT_FORM_SUBMIT = 'POST_FORGOT_FORM_SUBMIT';
const POST_FORGOT_FORM_SUCCESS = 'POST_FORGOT_FORM_SUCCESS';
const POST_FORGOT_FORM_FAILED = 'POST_FORGOT_FORM_FAILED';

const setForgotFormValue = (field: string, value: string) => ({
    type: FORGOT_FORM_SET_VALUE,
    field,
    value
});

function catchFetchError() {
    return {
        type: POST_FORGOT_FORM_FAILED
    };
}

const forgotPassword = (email: string) => {
    return function(dispatch: any) {
        dispatch({
            type: POST_FORGOT_FORM_SUBMIT
        });
        api.forgotPassword(email) 
        .then((res) => {
            if (res) {
                dispatch({
                    type: POST_FORGOT_FORM_SUCCESS,
                    res
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
    FORGOT_FORM_SET_VALUE,
    POST_FORGOT_FORM_SUBMIT,
    POST_FORGOT_FORM_SUCCESS,
    POST_FORGOT_FORM_FAILED,
    setForgotFormValue,
    forgotPassword
}