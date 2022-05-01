import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
    Logo, 
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import { getCookie } from '../../utils/cookie';

import appHeaderStyles from './app-header.module.css';


function AppHeader() {

    const loginSuccess = useSelector(state => state.loginFormReducer.loginSuccess);

    let path = getCookie('accessToken') || loginSuccess ? '/profile' : '/login';

    return(
        <header className={appHeaderStyles.header}>
            <nav className={appHeaderStyles.menu}>
                <BurgerIcon type="primary"/>
                <Link to="/" className="link text-color text text_type_main-default ml-2 mr-10 cursor">
                    Конструктор
                </Link>
                <ListIcon type="secondary"/>
                <p className="text text_type_main-default text_color_inactive ml-2 cursor">
                    Лента заказов
                </p>
            </nav>
            
            <Logo />
            
            <nav className={appHeaderStyles.login}>
                <ProfileIcon type="secondary"/>
                <Link to={path} className="link text text_type_main-default text_color_inactive ml-2">
                    Личный кабинет
                </Link>
            </nav>
        </header>
    );
}

export default memo(AppHeader);