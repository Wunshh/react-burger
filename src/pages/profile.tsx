import { FC } from 'react';

import ProfileForm from '../components/profile-form/profile-form';
import ProfileMenu from '../components/profile-menu/profile-menu';
import ProfileOrders from '../components/profile-orders/profile-orders';
import { Route } from 'react-router-dom';

import profilePageStyle from './profile.module.css'

interface IProfilePage {
    onCardClick: () => void;
}

const ProfilePage: FC<IProfilePage> = ({ onCardClick }) => {

    return (
        <section className={profilePageStyle.container}>
            <ProfileMenu />
            <Route exact path="/profile">
                <ProfileForm />
            </Route>
            <Route exact path="/profile/orders">
                <ProfileOrders 
                    onCardClick={onCardClick}
                />
            </Route>
        </section>
    );
}

export default ProfilePage;