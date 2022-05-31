import OrderList from '../order-list/order-list';

import profileOrdersStyle from './profile-orders.module.css';

import { ordersTestData } from '../../utils/testData';

function ProfileOrders() {
    return (
        <section className={profileOrdersStyle.section}>
            <OrderList data={ordersTestData}/>
        </section>
    );
}

export default ProfileOrders;
