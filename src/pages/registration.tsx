import { Redirect } from 'react-router-dom';
import { useSelector } from '../utils/hooks';

import RegistrationForm from '../components/registration-form/registration-form';

function RegistrationPage() {
    const userName = useSelector(store => store.loginFormReducer.form.name); 

    return (
        userName === undefined || userName.length === 0 ?
        <RegistrationForm />
        :
        <Redirect to={{ pathname: "/"}} /> 
    );
}

export default RegistrationPage; 