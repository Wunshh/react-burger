import { memo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
    Logo, 
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import { TLocation } from '../../utils/types';

import appHeaderStyles from './app-header.module.css';


function AppHeader() {

    const isLoggin = useSelector((store: any ) => store.userDataReducer.userIsLoggin);
    const loginSuccess = useSelector((store: any ) => store.loginFormReducer.loginSuccess);

    let path: string = loginSuccess || isLoggin ? '/profile' : '/login';

    const location: TLocation = useLocation();

    const celectType = (path: string) => {
       return location.pathname === path ? "primary" : "secondary";
    }

    return(
        <header className={appHeaderStyles.header}>
            <nav className={appHeaderStyles.menu}>

                <BurgerIcon type={celectType('/')}/>
                <NavLink 
                    exact
                    to="/" 
                    className="link text text_type_main-default text_color_inactive ml-2 cursor mr-10" 
                    activeClassName={appHeaderStyles.active}
                >
                    Конструктор
                </NavLink>

                <ListIcon type={celectType('/list')}/>
                <NavLink 
                    to="/list" 
                    className="link text text_type_main-default text_color_inactive ml-2 cursor" 
                    activeClassName={appHeaderStyles.active}
                >
                    Лента заказов
                </NavLink>
            </nav>

            <Link to="/">
                <Logo />
            </Link>
            <nav className={appHeaderStyles.login}>
                <ProfileIcon type={celectType(path)}/>
                <NavLink 
                    to={path} 
                    className="link text text_type_main-default text_color_inactive ml-2" 
                    activeClassName={appHeaderStyles.active}
                >
                    Личный кабинет
                </NavLink>
            </nav>
        </header>
    );
}

export default memo(AppHeader);