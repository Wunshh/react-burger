import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';
import { Link, useHistory } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { setResetFormValue, reset } from '../../services/actions/reset';
import { getCookie } from '../../utils/cookie';

import resetFormStyle from './reset-form.module.css';

function ResetForm() {

    const { password, token } = useSelector(state => state.resetFormReducer.form);
    const forgotSuccess = useSelector((state: any) => state.forgotPasswordFormReducer.forgotSuccess);
    const history = useHistory();

    const dispatch = useDispatch();

    const onFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
        dispatch(setResetFormValue(evt.target.name, evt.target.value));
    }

    const onFormSubmit = (evt: SyntheticEvent) => {
        evt.preventDefault();
        if (password !== undefined && token !== undefined) {
            dispatch(reset(password, token));
        }
    }

    useEffect(() => {
        if (!forgotSuccess || getCookie('accessToken')) {
            history.push('/');
        }
    }, [history, forgotSuccess]);

    const [showPassword, setShowPassword] = useState(false);
    const [isShown, setIsShown] = useState<"password" | "text" | "email" | undefined>('password');
    const inputRef = useRef<HTMLInputElement>(null);
    
    const onIconClick = () => {
        
        setTimeout(() => inputRef.current?.focus(), 0);
        if(!showPassword) {
            setShowPassword(true);
            setIsShown('text');
            
        } else {
            setShowPassword(false);
            setIsShown('password');
        }
    }

    return (
        <section className={resetFormStyle.reset}>
            <h3 className={`${resetFormStyle.title} text text_type_main-medium text-color mb-6`}>
                Восстановление пароля
            </h3>

            <form className={resetFormStyle.form} onSubmit={onFormSubmit}>
                <div className={resetFormStyle.input}>
                    <Input 
                        ref={inputRef}
                        type={isShown} 
                        placeholder="Введите новый пароль" 
                        icon={showPassword? "ShowIcon" : "HideIcon"}
                        onIconClick={onIconClick}
                        onChange={onFormChange}
                        value={password}
                        name='password'
                    />       
                </div>
                <div className={resetFormStyle.input}>
                    <Input 
                        type="text"  
                        placeholder="Введите код из письма" 
                        error={false}
                        onChange={onFormChange}
                        value={token}
                        name='token'
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