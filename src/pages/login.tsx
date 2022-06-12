import { useSelector } from '../utils/hooks';
import { Redirect, useLocation } from 'react-router-dom';

import { TLocation } from '../utils/types';

import LoginForm from '../components/login-form/login-form';

function LoginPage() {

    const isLoggin = useSelector(store => store.loginFormReducer.userIsLoggin);
    const loginSuccess = useSelector(store => store.loginFormReducer.loginSuccess);
    const { state }: TLocation = useLocation();

    return (
        (isLoggin || loginSuccess) ?
        <Redirect to={state?.from || '/'} /> 
        :
        <LoginForm />
    );
}

export default LoginPage;