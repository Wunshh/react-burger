import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { setUserFormValue, getUserData, updateUserData } from '../../services/actions/user';

import profileFormStyle from './profile-form.module.css';
import { useEffect, useState } from 'react';

function ProfileForm() {

    const [isFormChange, setIsFormChange] = useState(false);
    const {
        email,
        name,
        password,
    } = useSelector(state => state.userDataReducer.form);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    const onFormChange = (evt) => {
        dispatch(setUserFormValue(evt.target.name, evt.target.value));
        setIsFormChange(true);
    }

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        dispatch(updateUserData(email, name, password));
        setIsFormChange(false);
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