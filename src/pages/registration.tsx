import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RegistrationForm from '../components/registration-form/registration-form';

function RegistrationPage() {
    const userName = useSelector((store: any) => store.userDataReducer.form.name); 

    return (
        userName.length === 0 || userName === undefined ?
        <RegistrationForm />
        :
        <Redirect to={{ pathname: "/"}} /> 
    );
}

export default RegistrationPage; 