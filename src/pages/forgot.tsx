import { Redirect } from 'react-router-dom';
import { useSelector } from '../utils/hooks';

import ForgotForm from '../components/forgot-form/forgot-form';

function ForgotPasswordPage() {
    const userName = useSelector(store => store.loginFormReducer.form.name); 
    
    return (
        userName === undefined || userName.length === 0 ?
        <ForgotForm />
        : 
        <Redirect to={{ pathname: "/"}} /> 
    );
}

export default ForgotPasswordPage;