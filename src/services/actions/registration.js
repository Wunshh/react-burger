const REGISTER_FORM_SET_VALUE = 'REGISTER_FORM_SET_VALUE';

export const setRegistrationFormValue = (field, value) => ({
    type: REGISTER_FORM_SET_VALUE,
    field,
    value
}) 