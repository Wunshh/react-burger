import { FC } from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';

import ProfileForm from '../components/profile-form/profile-form';
import ProfileMenu from '../components/profile-menu/profile-menu';
import OrderList from '../components/order-list/order-list';

import profilePageStyle from './profile.module.css'

const ProfilePage: FC = () => {

    const { path } = useRouteMatch();
    const location = useLocation();

    return (
        <section className={profilePageStyle.container}>
            <ProfileMenu />
            <Switch location={location}>
                <Route exact path={`${path}`}>
                    <ProfileForm />
                </Route>
                <Route path={`${path}/orders`}>
                    <OrderList />
                </Route>
            </Switch>
        </section>
    );
}

export default ProfilePage;