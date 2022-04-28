import { Link } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import registrationStyle from './registration-form.module.css';

function RegistrationForm() {

    return (
         <section className={registrationStyle.registration}>
            <h3 className={`${registrationStyle.title} text text_type_main-medium text-color mb-6`}>
                Регистрация
            </h3>

            <form className={registrationStyle.form}>
                <div className={registrationStyle.input}>
                    <Input 
                        type="email"   
                        placeholder="E-mail" 
                        error={false}
                        value='1'
                        errorText={'Некорректный email'}
                    />
                </div>
                <div className={registrationStyle.input}>
                    <Input 
                        type="text"   
                        placeholder="Имя" 
                        error={false}
                        value='2'
                        errorText={'Заполните поле'}
                    />
                </div>
                <div className={registrationStyle.input}>
                    <PasswordInput
                        value='3'
                    />
                </div>

                <Button 
                    type="primary" 
                    size="medium"
                >
                    Зарегистрироваться
                </Button>
            </form>

            <p className={`${registrationStyle.text} text text_type_main-default text_color_inactive mb-4`}>
                Уже зарегистрированы?
                <Link 
                    to="/login" 
                    className={registrationStyle.link}
                >
                    Войти
                </Link>
            </p>
        </section>
    );
}

export default RegistrationForm;