import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

import LoginForm from '../components/login-form/login-form';
import { TLocation } from '../utils/types';

function LoginPage() {

    const userName = useSelector((store: any) => store.userDataReducer.form.name); 
    const location: TLocation = useLocation();
    const path = location.state === null || location.state === undefined ? '/' : location.state.from.pathname;

    return (
        userName.length === 0 || userName === undefined ?
        <LoginForm />
        :
        <Redirect to={path} />    
    );
}

export default LoginPage;