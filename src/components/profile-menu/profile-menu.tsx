import { NavLink } from 'react-router-dom';
import { useDispatch } from '../../utils/hooks';

import  { deleteCookie } from '../../utils/cookie';
import { LOGOUT } from '../../services/actions/login';
import{ USER_LOGOUT } from  '../../services/actions/user';


import profileMenuStyle from './profile-menu.module.css';

function ProfileMenu() {

    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        dispatch({
            type: LOGOUT
        });
        dispatch({
            type: USER_LOGOUT
        });
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
                to="/profile/orders"
                className={`text text_type_main-medium text_color_inactive ${profileMenuStyle.link}`}
                activeClassName={profileMenuStyle.link_active}
            >
                История заказов
            </NavLink>
            <NavLink 
                to="/login"
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