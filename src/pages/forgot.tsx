import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ForgotForm from '../components/forgot-form/forgot-form';

function ForgotPasswordPage() {
    const userName = useSelector((store: any) => store.userDataReducer.form.name); 
    
    return (
        userName.length === 0 || userName === undefined ?
        <ForgotForm />
        : 
        <Redirect to={{ pathname: "/"}} /> 
    );
}

export default ForgotPasswordPage;