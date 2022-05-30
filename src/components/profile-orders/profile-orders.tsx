import OrderList from '../order-list/order-list';
import OrderIngreients from '../order-ingreients/order-ingreients';

import profileOrdersStyle from './profile-orders.module.css';

import { ordersTestData } from '../../utils/testData';

function ProfileOrders() {
    return (
        <section className={profileOrdersStyle.section}>
            <OrderIngreients/>
            <OrderList data={ordersTestData}/>
        </section>
    );
}

export default ProfileOrders;
