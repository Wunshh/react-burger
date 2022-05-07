import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

import LoginForm from '../components/login-form/login-form';

function LoginPage() {

    const isLoggin = useSelector(store => store.userDataReducer.userIsLoggin);
    const loginSuccess = useSelector(store => store.loginFormReducer.loginSuccess);
    const location = useLocation();
    const path = location.state === null || location.state === undefined ? '/' : location.state.from.pathname;

    return (
        (isLoggin || loginSuccess) ?
        <Redirect to={path} /> 
        :
        <LoginForm />
    );
}

export default LoginPage;