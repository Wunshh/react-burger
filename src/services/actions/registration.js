import * as api from '../../utils/api';

const REGISTER_FORM_SET_VALUE = 'REGISTER_FORM_SET_VALUE';
const POST_REGISTER_FORM_SUBMIT = 'POST_REGISTER_FORM_SUBMIT';
const POST_REGISTER_FORM_SUCCESS = 'POST_REGISTER_FORM_SUCCESS';
const POST_REGISTER_FORM_FAILED = 'POST_REGISTER_FORM_FAILED';

const setRegistrationFormValue = (field, value) => ({
    type: REGISTER_FORM_SET_VALUE,
    field,
    value
});

function catchFetchError() {
    return {
        type: POST_REGISTER_FORM_FAILED
    };
}

const register = (email, name, password) => {
    return function(dispatch) {
        dispatch({
            type: POST_REGISTER_FORM_SUBMIT
        });
        api.register(email, name, password) 
        .then((res) => {
            if (res) {
                dispatch({
                    type: POST_REGISTER_FORM_SUCCESS,
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
    REGISTER_FORM_SET_VALUE,
    POST_REGISTER_FORM_SUBMIT,
    POST_REGISTER_FORM_SUCCESS,
    POST_REGISTER_FORM_FAILED,
    setRegistrationFormValue,
    register
}