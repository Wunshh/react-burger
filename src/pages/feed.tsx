import { FC } from 'react';

import OrderList from '../components/order-list/order-list';
import OrderHistory from '../components/order-history/order-history';

import feedPageStyle from './feed.module.css';

const FeedPage: FC = ()  =>{
    return (
        <section className={feedPageStyle.page}>
            <OrderList/>
            <OrderHistory/>
        </section>
    )
}

export default FeedPage;