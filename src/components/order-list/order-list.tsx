import { FC, memo, useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import useWindowHeight from '../../utils/hooks/useWindowHeight';
import { desctopHeight } from '../../utils/data';
import OrderListCard from '../order-list-card/order-list-card';
import { useDispatch} from '../../utils/hooks';
import { getIngredientsData } from '../../services/actions/ingredients';
import { TListOrders } from '../../utils/types';

import orderListStyle from './order-list.module.css';

interface IOrderList {
    data: TListOrders;
    onCardClick: () => void;
}

const OrderList: FC<IOrderList> = ({ data, onCardClick }) => {

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
            <Route exact path="/feed">
                <h1 className="text text_type_main-large mb-5">
                    Лента заказов
                </h1>
            </Route>
            <div className={orderListStyle.orders} style={{maxHeight: deviceHeihgt}}> 
                {data.orders.map((item: any) => {
                        return (
                            <OrderListCard
                                key={item._id}
                                item={item}
                                onCardClick={onCardClick}
                            />
                        );
                    })
                }
            </div>
        </section>
    )
}

export default memo(OrderList);