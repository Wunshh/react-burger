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
                <p className="text text_type_main-default ml-2 mr-10" style={{ cursor: 'pointer' }}>
                    Конструктор
                </p>
                <ListIcon type="secondary"/>
                <p className="text text_type_main-default text_color_inactive ml-2" style={{ cursor: 'pointer' }}>
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

export default AppHeader;