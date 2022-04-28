import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import resetFormStyle from './reset-form.module.css';

function ResetForm() {
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef();
    
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0);
        if(!showPassword) {
            setShowPassword(true);
        } else {
            setShowPassword(false);
        }
    }

    return (
        <section className={resetFormStyle.reset}>
            <h3 className={`${resetFormStyle.title} text text_type_main-medium text-color mb-6`}>
                Восстановление пароля
            </h3>

            <form className={resetFormStyle.form}>
                <div className={resetFormStyle.input}>
                    <Input 
                        ref={inputRef}
                        type="password"  
                        placeholder="Введите новый пароль" 
                        error={false}
                        value='1'
                        icon={showPassword? "ShowIcon" : "HideIcon"}
                        onIconClick={onIconClick}
                    />
                </div>
                <div className={resetFormStyle.input}>
                    <Input 
                        type="text"  
                        placeholder="Введите код из письма" 
                        error={false}
                        value='2'
                    />
                </div>

                <Button 
                    type="primary" 
                    size="medium"
                >
                    Сохранить
                </Button>
            </form>

            <p className={`${resetFormStyle.text} text text_type_main-default text_color_inactive mb-4`}>
                Вспомнили пароль?
                <Link 
                    to="/login" 
                    className={resetFormStyle.link}
                >
                    Войти
                </Link>
            </p>
            
        </section>
    );
}

export default ResetForm;