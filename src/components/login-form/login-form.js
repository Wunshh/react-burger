import { Link } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import loginStyle from './login-from.module.css';


function LoginForm() {
    
    return (
        <section className={loginStyle.login}>
            <h3 className={`${loginStyle.title} text text_type_main-medium text-color mb-6`}>Вход</h3>

            <form className={loginStyle.form}>
                <div className={loginStyle.input}>
                    <Input 
                        type="email"   
                        placeholder="E-mail" 
                        error={false}
                        value="1"
                        errorText={'Некорректный email'}
                    />
                </div>
                <div className={loginStyle.input}>
                    <PasswordInput
                        value='2'
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