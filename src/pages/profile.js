import ProfileForm from '../components/profile-form/profile-form';
import ProfileMenu from '../components/profile-menu/profile-menu';

import profilePageStyle from './profile.module.css'

function ProfilePage() {

    return (
        <section className={profilePageStyle.container}>
            <ProfileMenu />
            <ProfileForm />
        </section>
    );
}

export default ProfilePage;