import { SyntheticEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { setLoginFormValue, login } from '../../services/actions/login';

import loginStyle from './login-from.module.css';


function LoginForm() {

    const {
        email,
        password,
    } = useSelector((state: any) => state.loginFormReducer.form);
    const dispatch = useDispatch();

    const onFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
        dispatch(setLoginFormValue(evt.target.name, evt.target.value));
    }

    const onFormSubmit = (evt: SyntheticEvent) => {
        evt.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <section className={loginStyle.login}>
            <h3 className={`${loginStyle.title} text text_type_main-medium text-color mb-6`}>Вход</h3>

            <form className={loginStyle.form} onSubmit={onFormSubmit}>
                <div className={loginStyle.input}>
                    <Input 
                        type="email"   
                        placeholder="E-mail" 
                        errorText={'Некорректный email'}
                        onChange={onFormChange}
                        value={email}
                        name='email'
                    />
                </div>
                <div className={loginStyle.input}>
                    <PasswordInput
                        onChange={onFormChange}
                        value={password}
                        name='password'
                    />
                </div>

                <Button 
                    type="primary" 
                    size="medium"
                >
                    Войти
                </Button>
            </form>

            <p className={`${loginStyle.text} text text_type_main-default text_color_inactive mb-4`}>
                Вы — новый пользователь? 
                <Link 
                    to="/register" 
                    className={loginStyle.link}
                >
                    Зарегистрироваться
                </Link>
            </p>

            <p className={`${loginStyle.text} text text_type_main-default text_color_inactive`}>
                Забыли пароль?
                <Link 
                    to="/forgot-password" 
                    className={loginStyle.link}
                >
                    Восстановить пароль
                </Link>
            </p>
        </section>
    );
}

export default LoginForm;