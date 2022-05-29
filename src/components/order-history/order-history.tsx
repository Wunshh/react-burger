import { FC } from 'react';

import orderHistoryStyle from './order-history.module.css';


import {ordersTestData} from '../../utils/testData';



const OrderHistory: FC = () => {

    const readyOrder = ordersTestData.orders.filter((item: any) => item.status === "done");
    const createdOrder = ordersTestData.orders.filter((item: any) => item.status === "created");

    return (
        <section className={orderHistoryStyle.section}>
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