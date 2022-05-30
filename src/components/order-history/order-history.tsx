import { FC, useEffect, useState } from 'react';

import useWindowHeight from '../../utils/hooks/useWindowHeight';
import { desctopHeight } from '../../utils/data';

import orderHistoryStyle from './order-history.module.css';


import {ordersTestData} from '../../utils/testData';



const OrderHistory: FC = () => {

    const windowHeight = useWindowHeight();
    const [deviceHeihgt, setDeviceHeihgt] = useState(740);

    const readyOrder = ordersTestData.orders.filter((item: any) => item.status === "done");
    const createdOrder = ordersTestData.orders.filter((item: any) => item.status === "pending");

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
                    {readyOrder.splice(0, 5).map((item: any) => {
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
                    {createdOrder.splice(0, 5).map((item: any) => {
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
                {ordersTestData.total}
            </p>

            <p className='text text_type_main-medium'>
                Выполнено за сегодня:
            </p>
            <p className="text text_type_digits-large text-shadow">
                {ordersTestData.totalToday}
            </p>

        </section>
    );
}

export default OrderHistory;