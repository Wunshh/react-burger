import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegistrationForm from '../components/registration-form/registration-form';

function RegistrationPage() {
    const isLoggin = useSelector(store => store.userDataReducer.userIsLoggin);
    const loginSuccess = useSelector(store => store.loginFormReducer.loginSuccess);

    return (
        (loginSuccess || isLoggin ) ?
        <Redirect to={{ pathname: "/"}} /> 
        :
        <RegistrationForm />
    );
}

export default RegistrationPage; 