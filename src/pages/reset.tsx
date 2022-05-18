import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ResetForm from '../components/reset-form/reset-form';

function ResetPage() {

    const userName = useSelector((store: any) => store.userDataReducer.form.name); 

    return (
        userName.length === 0 || userName === undefined ?
        <ResetForm />
        :
        <Redirect to={{ pathname: "/"}} /> 
    );
}

export default ResetPage;