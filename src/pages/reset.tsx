import { Redirect } from 'react-router-dom';
import { useSelector } from '../utils/hooks';
import ResetForm from '../components/reset-form/reset-form';

function ResetPage() {

    const userName = useSelector(store => store.userDataReducer.form.name); 

    return (
        userName === undefined || userName.length === 0 ?
        <ResetForm />
        :
        <Redirect to={{ pathname: "/"}} /> 
    );
}

export default ResetPage;