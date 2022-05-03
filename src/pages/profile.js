import ProfileForm from '../components/profile-form/profile-form';
import ProfileMenu from '../components/profile-menu/profile-menu';
import ProfileOrders from '../components/profile-orders/profile-orders';
import { Route } from 'react-router-dom';

import profilePageStyle from './profile.module.css'

function ProfilePage() {

    return (
        <section className={profilePageStyle.container}>
            <ProfileMenu />
            <Route exact path="/profile">
                <ProfileForm />
            </Route>
            <Route exact path="/profile/orders">
                <ProfileOrders />
            </Route>
        </section>
    );
}

export default ProfilePage;