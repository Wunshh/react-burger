import { ChangeEvent, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Input, 
    PasswordInput, 
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import { setRegistrationFormValue, register } from '../../services/actions/registration';

import registrationStyle from './registration-form.module.css';


function RegistrationForm() {

    const {
        email,
        name,
        password,
    } = useSelector((state: any) => state.registrationFormReducer.form);

    const dispatch = useDispatch();

    const onFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
        dispatch(setRegistrationFormValue(evt.target.name, evt.target.value));
    }

    const onFormSubmit = (evt: SyntheticEvent) => {
        evt.preventDefault();
        dispatch(register(email, name, password));
    }

    return (
         <section className={registrationStyle.registration}>
            <h3 className={`${registrationStyle.title} text text_type_main-medium text-color mb-6`}>
                Регистрация
            </h3>

            <form className={registrationStyle.form} onSubmit={onFormSubmit}>
                <div className={registrationStyle.input}>
                    <Input 
                        type="email"   
                        placeholder="E-mail" 
                        error={false}
                        errorText={'Некорректный email'}
                        onChange={onFormChange}
                        value={email}
                        name='email'
                    />
                </div>
                <div className={registrationStyle.input}>
                    <Input 
                        type="text"   
                        placeholder="Имя" 
                        error={false}
                        errorText={'Заполните поле'}
                        onChange={onFormChange}
                        value={name}
                        name='name'
                    />
                </div>
                <div className={registrationStyle.input}>
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