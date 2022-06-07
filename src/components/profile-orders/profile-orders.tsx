import { FC, useEffect } from 'react';

import OrderList from '../order-list/order-list';
import { useDispatch } from '../../utils/hooks';
import { getIngredientsData } from '../../services/actions/ingredients'; 

import profileOrdersStyle from './profile-orders.module.css';

const ProfileOrders: FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredientsData());
    }, [dispatch]);

    return (
        <section className={profileOrdersStyle.section}>
            <OrderList />
        </section>
    );
}

export default ProfileOrders;
