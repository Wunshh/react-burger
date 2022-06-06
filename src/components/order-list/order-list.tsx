import { FC, memo, useState, useEffect } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import useWindowHeight from '../../utils/hooks/useWindowHeight';
import { desctopHeight } from '../../utils/data';
import OrderListCard from '../order-list-card/order-list-card';
import { useDispatch, useSelector } from '../../utils/hooks';
import { wsConnectionStart, wsConnectionClosed}  from '../../services/actions/wsActions';
import { getCookie } from '../../utils/cookie';
import { WS_URL } from '../../utils/data';

import orderListStyle from './order-list.module.css';

interface IOrderList {
    onCardClick: () => void;
}

const OrderList: FC<IOrderList> = ({ onCardClick }) => {

    const dispatch = useDispatch();
    const windowHeight = useWindowHeight();
    const [deviceHeihgt, setDeviceHeihgt] = useState(740);
    const pathCurrent = useRouteMatch();
    const data = useSelector(store => store.wsReduser.orders);
    const token = pathCurrent.path === '/feed' ? "" : `?token=${getCookie('accessToken').replace('Bearer ', '')}`;   
    
    console.log(token);
    

    useEffect(() => {
        if (windowHeight <= desctopHeight) {
            setDeviceHeihgt(560);
        } else {
            setDeviceHeihgt(740);
        }
    }, [windowHeight]);

    useEffect(() => {
        dispatch(
            pathCurrent.path === '/feed' ? 
                wsConnectionStart(WS_URL + '/all')
            : 
                wsConnectionStart(WS_URL + token)
        );

        return () => {
            (dispatch(wsConnectionClosed));
        }
    }, [dispatch, pathCurrent.path, token]);
    

    return (
        <section className={orderListStyle.section}>
            <Route exact path="/feed">
                <h1 className="text text_type_main-large mb-5">
                    Лента заказов
                </h1>
            </Route>
            <div className={orderListStyle.orders} style={{maxHeight: deviceHeihgt}}> 
                {data.map((item: any) => {
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