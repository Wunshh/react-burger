import { memo } from 'react';
import { 
    Logo, 
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import appHeaderStyles from './app-header.module.css';


function AppHeader() {
    return(
        <header className={appHeaderStyles.header}>
            <nav className={appHeaderStyles.menu}>
                <BurgerIcon type="primary"/>
                <p className="text text_type_main-default ml-2 mr-10 cursor">
                    Конструктор
                </p>
                <ListIcon type="secondary"/>
                <p className="text text_type_main-default text_color_inactive ml-2 cursor">
                    Лента заказов
                </p>
            </nav>
            <div className={appHeaderStyles.logo}>
                <Logo />
            </div>
            <nav className={appHeaderStyles.login}>
                <ProfileIcon type="secondary"/>
                <p className="text text_type_main-default text_color_inactive ml-2">
                    Личный кабинет
                </p>
            </nav>
        </header>
    );
}

export default memo(AppHeader);