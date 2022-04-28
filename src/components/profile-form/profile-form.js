import { useState, useRef } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import profileFormStyle from './profile-form.module.css';

function ProfileForm() {

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
        <form>
            <div className={profileFormStyle.input}>
                <Input 
                    ref={inputRef}
                    type="text"  
                    placeholder="Имя" 
                    error={false}
                    value='1'
                    icon={"EditIcon"}
                    onIconClick={onIconClick}
                />
            </div>
            <div className={profileFormStyle.input}>
                <Input 
                    ref={inputRef}
                    type="email"  
                    placeholder="Логин" 
                    error={false}
                    value='2'
                    icon={"EditIcon"}
                    onIconClick={onIconClick}
                />
            </div>
            <div className={profileFormStyle.input}>
                <Input 
                    ref={inputRef}
                    type="password"  
                    placeholder="Пароль" 
                    error={false}
                    value='3'
                    icon={"EditIcon"}
                    onIconClick={onIconClick}
                />
            </div>
        </form>

    );
}

export default ProfileForm;