import { useState, SyntheticEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { setUserFormValue, getUserData, updateUserData } from '../../services/actions/login';
import profileFormStyle from './profile-form.module.css';

function ProfileForm() {

    const [inputDisabled, setInputDisabled] = useState(true);
    const [isFormChange, setIsFormChange] = useState(false);
    const {
        email,
        name,
        password,
    } = useSelector(state => state.loginFormReducer.form);
    

    if(email === null || email === undefined) {
        
    }

    const dispatch = useDispatch();

    const onFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
        dispatch(setUserFormValue(evt.target.name, evt.target.value));
        setIsFormChange(true);
    }

    const onIconClick = () => {
        setInputDisabled(false);
        setIsFormChange(true);
    }

    const onFormSubmit = (evt: SyntheticEvent) => {
        evt.preventDefault();
        if (email !== undefined && name !== undefined && password !== undefined) {
            dispatch(updateUserData(email, name, password));
        }
        setIsFormChange(false);
        setInputDisabled(true)
    }

    const getBackUserData = () => {
        dispatch(getUserData());
        setIsFormChange(false);
    }

    return (
        <form> 
            <div className={profileFormStyle.input}>
                <Input 
                    type="text"  
                    placeholder="Имя" 
                    icon={"EditIcon"}
                    onChange={onFormChange}
                    value={name}
                    name='name'
                    disabled={inputDisabled}
                    onIconClick={onIconClick}
                />
            </div>
            <div className={profileFormStyle.input}>
                <Input 
                    type="email"  
                    placeholder="Логин" 
                    icon={"EditIcon"}
                    onChange={onFormChange}
                    value={email}
                    name='email'
                    disabled={inputDisabled}
                    onIconClick={onIconClick}
                />
            </div>
            <div className={profileFormStyle.input}>
                <Input 
                    type="password"  
                    placeholder="Пароль" 
                    icon={"EditIcon"}
                    onChange={onFormChange}
                    value={password}
                    name='password'
                    disabled={inputDisabled}
                    onIconClick={onIconClick}
                />
            </div>

            <div className={isFormChange ? profileFormStyle.buttons : profileFormStyle.invisible}>
                <Button 
                    type="secondary" 
                    size="medium"
                    onClick={getBackUserData}
                >
                    Отмена
                </Button>
                <Button 
                    type="primary" 
                    size="medium"
                    onClick={onFormSubmit}
                >
                    Сохранить
                </Button>
            </div>
        </form>

    );
}

export default ProfileForm;