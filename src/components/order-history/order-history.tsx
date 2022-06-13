import { FC, useEffect, useState } from 'react';

import useWindowHeight from '../../utils/hooks/useWindowHeight';
import { desctopHeight } from '../../utils/data';
import { useSelector } from '../../utils/hooks';
import { TOrders } from '../../utils/types';

import orderHistoryStyle from './order-history.module.css';


const OrderHistory: FC = () => {

    const data = useSelector(store => store.wsReduser.orders);
    const total = useSelector(store => store.wsReduser.total);
    const totalToday = useSelector(store => store.wsReduser.totalToday)

    const windowHeight = useWindowHeight();
    const [deviceHeihgt, setDeviceHeihgt] = useState(740);

    const readyOrder = data.filter((item: TOrders) => item.status === "done");
    const createdOrder = data.filter((item: TOrders) => item.status === "pending");

    useEffect(() => {
        if (windowHeight <= desctopHeight) {
            setDeviceHeihgt(560);
        } else {
            setDeviceHeihgt(740);
        }
    }, [windowHeight]);

    return (
        <section className={orderHistoryStyle.section} style={{maxHeight: deviceHeihgt}}>
            <div className={orderHistoryStyle.order}> 
                <div className={orderHistoryStyle.numbers}>
                    <p className='text text_type_main-medium mb-6'>Готовы:</p>
                    {readyOrder.splice(0, 5).map((item: TOrders) => {
                        return (
                            <p 
                                key={item.number}
                                className="text text_type_digits-default mb-2 color"
                            >
                                {item.number}
                            </p>
                        );
                    })}
                </div>
                <div className={orderHistoryStyle.numbers}>
                    <p className='text text_type_main-medium mb-6'>В работе:</p>
                    {createdOrder.splice(0, 5).map((item: TOrders) => {
                        return (
                            <p 
                                key={item.number}
                                className="text text_type_digits-default mb-2"
                            >
                                {item.number}
                            </p>
                        );
                    })}
                </div>
            </div>
            
            <p className='text text_type_main-medium'>
                Выполнено за все время:
            </p>
            <p className="text text_type_digits-large text-shadow mb-15">
                {total}
            </p>

            <p className='text text_type_main-medium'>
                Выполнено за сегодня:
            </p>
            <p className="text text_type_digits-large text-shadow">
                {totalToday}
            </p>

        </section>
    );
}

export default OrderHistory;