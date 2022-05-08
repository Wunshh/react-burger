import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ResetForm from '../components/reset-form/reset-form';

function ResetPage() {

    const isLoggin = useSelector(store => store.userDataReducer.userIsLoggin);
    const loginSuccess = useSelector(store => store.loginFormReducer.loginSuccess);

    return (
        (loginSuccess || isLoggin ) ?
        <Redirect to={{ pathname: "/"}} /> 
        :
        <ResetForm />
    );
}

export default ResetPage;