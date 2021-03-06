import { FC, memo, useState, useEffect } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import useWindowHeight from '../../utils/hooks/useWindowHeight';
import { desctopHeight } from '../../utils/data';
import OrderListCard from '../order-list-card/order-list-card';
import { useDispatch, useSelector } from '../../utils/hooks';
import { wsConnectionStart, wsConnectionClosed}  from '../../services/actions/wsActions';
import { getIngredientsData } from '../../services/actions/ingredients';
import { getCookie } from '../../utils/cookie';
import { WS_URL } from '../../utils/data';
import { TOrders } from '../../utils/types';

import orderListStyle from './order-list.module.css';

const OrderList: FC = () => {

    const dispatch = useDispatch();
    const windowHeight = useWindowHeight();
    const [deviceHeihgt, setDeviceHeihgt] = useState(740);
    const pathCurrent = useRouteMatch({ path: "/profile/orders" });
    const data = useSelector(store => store.wsReduser.orders); 

    useEffect(() => {
        dispatch(getIngredientsData());
    }, [dispatch]);
 
    useEffect(() => {
        if (windowHeight <= desctopHeight) {
            setDeviceHeihgt(560);
        } else {
            setDeviceHeihgt(740);
        }
    }, [windowHeight]);

    useEffect(() => {
        dispatch(
            pathCurrent ? 
                wsConnectionStart(WS_URL + `?token=${getCookie('accessToken').replace('Bearer ', '')}`)
            : 
                wsConnectionStart(WS_URL + '/all')
        );

        return () => {
            (dispatch(wsConnectionClosed()));
        }
    }, []);    

    return (
        <section className={orderListStyle.section}>
            <Route exact path="/feed">
                <h1 className="text text_type_main-large mb-5">
                    Лента заказов
                </h1>
            </Route>
            <div className={orderListStyle.orders} style={{maxHeight: deviceHeihgt}}> 
                {data.map((item: TOrders) => {
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