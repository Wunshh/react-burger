import appHeaderStyles from './app-header.module.css';
import { 
    Logo, 
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return(
        <header className={appHeaderStyles.header}>
            <nav className={appHeaderStyles.menu}>
                <BurgerIcon type="primary"/>
                <p className="text text_type_main-default ml-2 mr-10">
                    Конструктор
                </p>
                <ListIcon type="secondary"/>
                <p className="text text_type_main-default text_color_inactive ml-2">
                    Лента заказов
                </p>
            </nav>
            <Logo />
            <nav className={appHeaderStyles.login}>
                <ProfileIcon type="secondary"/>
                <p className="text text_type_main-default text_color_inactive ml-2">
                    Личный кабинет
                </p>
            </nav>
        </header>
    );
}

export default AppHeader;