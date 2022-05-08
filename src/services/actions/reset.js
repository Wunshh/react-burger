import * as api from '../../utils/api';

const RESET_FORM_SET_VALUE = 'RESET_FORM_SET_VALUE';
const POST_RESET_FORM_SUBMIT = 'POST_RESET_FORM_SUBMIT';
const POST_RESET_FORM_SUCCESS = 'POST_RESET_FORM_SUCCESS';
const POST_RESET_FORM_FAILED = 'POST_RESET_FORM_FAILED';

const setResetFormValue = (field, value) => ({
    type: RESET_FORM_SET_VALUE,
    field,
    value
});

function catchFetchError() {
    return {
        type: POST_RESET_FORM_FAILED 
    };
}

const reset = (password, token) => {
    return function(dispatch) {
        dispatch({
            type: POST_RESET_FORM_SUBMIT
        });
        api.reset(password, token) 
        .then((res) => {
            if (res) {
                dispatch({
                    type: POST_RESET_FORM_SUCCESS,
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
    RESET_FORM_SET_VALUE,
    POST_RESET_FORM_SUBMIT,
    POST_RESET_FORM_SUCCESS,
    POST_RESET_FORM_FAILED,
    setResetFormValue,
    reset
}