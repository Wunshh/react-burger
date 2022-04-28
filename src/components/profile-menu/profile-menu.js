import { NavLink, useRouteMatch } from 'react-router-dom';

import profileMenuStyle from './profile-menu.module.css';

function ProfileMenu() {

    const { url } = useRouteMatch();

    return (
        <section className={profileMenuStyle.menu}>
            <NavLink 
                to="/profile" 
                className={`text text_type_main-medium text_color_inactive ${profileMenuStyle.link}`}
                activeClassName={profileMenuStyle.link_active}
            >
                Профиль
            </NavLink>
            <NavLink 
                to={`${url}/orders`}
                className={`text text_type_main-medium text_color_inactive ${profileMenuStyle.link}`}
                activeClassName={profileMenuStyle.link_active}
            >
                История заказов
            </NavLink>
            <NavLink 
                to="/login"
                className={`text text_type_main-medium text_color_inactive ${profileMenuStyle.link}`}
            >
                Выход
            </NavLink>
            <p  
                className={`${profileMenuStyle.text} text text_type_main-small text_color_inactive`}
            >
                В этом разделе вы можете <br/>
                изменить свои персональные данные
            </p>
        </section>
    );
}

export default ProfileMenu;