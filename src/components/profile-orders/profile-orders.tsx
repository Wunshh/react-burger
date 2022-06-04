import { FC } from 'react';

import OrderList from '../order-list/order-list';

import profileOrdersStyle from './profile-orders.module.css';

import { ordersTestData } from '../../utils/testData';

interface IProfileOrders {
    onCardClick: () => void;
}

const ProfileOrders: FC<IProfileOrders> = ({onCardClick}) => {
    return (
        <section className={profileOrdersStyle.section}>
            <OrderList 
                data={ordersTestData}
                onCardClick={onCardClick}
            />
        </section>
    );
}

export default ProfileOrders;
