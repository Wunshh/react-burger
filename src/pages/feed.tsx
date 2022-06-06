import { FC } from 'react';

import OrderList from '../components/order-list/order-list';
import OrderHistory from '../components/order-history/order-history';

import feedPageStyle from './feed.module.css';
interface IOrderList {
    onCardClick: () => void;
}

const FeedPage: FC<IOrderList> = ({onCardClick}) => {
    return (
        <section className={feedPageStyle.page}>
            <OrderList 
                onCardClick={onCardClick}
            />
            <OrderHistory/>
        </section>
    )
}

export default FeedPage;