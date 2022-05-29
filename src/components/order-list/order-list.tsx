import { FC, memo, useState, useEffect } from 'react';

import useWindowHeight from '../../utils/hooks/useWindowHeight';
import {
    desctopHeight,
} from '../../utils/data';
import OrderListCard from '../order-list-card/order-list-card';
import { useDispatch} from '../../utils/hooks';
import { getIngredientsData } from '../../services/actions/ingredients';

import orderListStyle from './order-list.module.css';



import {ordersTestData} from '../../utils/testData';


const OrderList: FC = () => {

    const dispatch = useDispatch();
    const windowHeight = useWindowHeight();
    const [deviceHeihgt, setDeviceHeihgt] = useState(740);

    useEffect(() => {
        if (windowHeight <= desctopHeight) {
            setDeviceHeihgt(560);
        } else {
            setDeviceHeihgt(740);
        }
    }, [windowHeight]);
    
    useEffect(() => {
        dispatch(getIngredientsData());
    }, [dispatch]);

    return (
        <section className={orderListStyle.section}>
            <h1 className="text text_type_main-large mb-5">
                Лента заказов
            </h1>
            <div className={orderListStyle.orders} style={{maxHeight: deviceHeihgt}}> 
                {ordersTestData.orders.map((item: any) => {
                        return (
                            <OrderListCard
                                key={item._id}
                                item={item}
                            />
                        );
                    })
                }
            </div>
        </section>
    )
}

export default memo(OrderList);