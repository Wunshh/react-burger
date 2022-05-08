
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { setForgotFormValue, forgotPassword } from '../../services/actions/forgotPassword';

import forgotFormStyle from './forgot-form.module.css';

function ForgotForm() {

    const history = useHistory();

    const { email } = useSelector(state => state.forgotPasswordFormReducer.form);
    const forgotSuccess = useSelector(state => state.forgotPasswordFormReducer.forgotSuccess);

    const dispatch = useDispatch();

    const onFormChange = (evt) => {
        dispatch(setForgotFormValue(evt.target.name, evt.target.value));
    }

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        dispatch(forgotPassword(email));
    }

    useEffect(() => {
        if (forgotSuccess) {
            history.push('/reset-password');
        } 
    }, [forgotSuccess, history]);
    
    return (
        <section className={forgotFormStyle.forgot}>
            <h3 className={`${forgotFormStyle.title} text text_type_main-medium text-color mb-6`}>
                Восстановление пароля
            </h3>

            <form className={forgotFormStyle.form} onSubmit={onFormSubmit}>
                <div className={forgotFormStyle.input}>
                    <Input 
                        type="email"   
                        placeholder="Укажите e-mail" 
                        errorText={'Некорректный email'}
                        onChange={onFormChange}
                        value={email}
                        name='email'
                    />
                </div>

                <Button 
                    type="primary" 
                    size="medium"
                >
                    Восстановить
                </Button>
            </form>

            <p className={`${forgotFormStyle.text} text text_type_main-default text_color_inactive mb-4`}>
                Вспомнили пароль?
                <Link 
                    to="/login" 
                    className={forgotFormStyle.link}
                >
                    Войти
                </Link>
            </p>
            
        </section>
    );
}

export default ForgotForm;