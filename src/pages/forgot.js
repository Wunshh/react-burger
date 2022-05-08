import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ForgotForm from '../components/forgot-form/forgot-form';

function ForgotPasswordPage() {
    const isLoggin = useSelector(store => store.userDataReducer.userIsLoggin);
    const loginSuccess = useSelector(store => store.loginFormReducer.loginSuccess);

    return (
        (loginSuccess || isLoggin ) ?
        <Redirect to={{ pathname: "/"}} /> 
        :
        <ForgotForm />
    );
}

export default ForgotPasswordPage;