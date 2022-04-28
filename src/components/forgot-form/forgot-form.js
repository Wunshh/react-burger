
import { Link } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import forgotFormStyle from './forgot-form.module.css';

function ForgotForm() {
    
    return (
        <section className={forgotFormStyle.forgot}>
            <h3 className={`${forgotFormStyle.title} text text_type_main-medium text-color mb-6`}>
                Восстановление пароля
            </h3>

            <form className={forgotFormStyle.form}>
                <div className={forgotFormStyle.input}>
                    <Input 
                        type="email"   
                        placeholder="Укажите e-mail" 
                        error={false}
                        value="1"
                        errorText={'Некорректный email'}
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