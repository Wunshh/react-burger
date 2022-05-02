import { NavLink, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import  { deleteCookie } from '../../utils/cookie';
import { LOGOUT } from '../../services/actions/login';


import profileMenuStyle from './profile-menu.module.css';

function ProfileMenu() {

    const { url } = useRouteMatch();
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        dispatch({
            type: LOGOUT
        })
    }

    return (
        <section className={profileMenuStyle.menu}>
            <NavLink 
                exact
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
                to="/"
                onClick={logout}
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