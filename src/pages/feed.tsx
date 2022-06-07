import { FC, useEffect } from 'react';

import { getIngredientsData } from '../services/actions/ingredients'; 
import { useDispatch } from '../utils/hooks';

import OrderList from '../components/order-list/order-list';
import OrderHistory from '../components/order-history/order-history';


import feedPageStyle from './feed.module.css';

const FeedPage: FC = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngredientsData());
    }, [dispatch]);

    return (
        <section className={feedPageStyle.page}>
            <OrderList />
            <OrderHistory/>
        </section>
    )
}

export default FeedPage;