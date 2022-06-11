import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { useDispatch } from '../utils/hooks';
import { wsConnectionStart, wsConnectionClosed}  from '../services/actions/wsActions';
import { getCookie } from '../utils/cookie';
import { WS_URL } from '../utils/data';
import OrderIngreients from '../components/order-ingreients/order-ingreients';

import orderIngredientPageStyle from './order-ingredient-page.module.css';

function OrderIngreientsPage() {

    const dispatch = useDispatch();
    const pathCurrent = useRouteMatch({ path: "/profile/orders/" });
    const token = pathCurrent ? `?token=${getCookie('accessToken').replace('Bearer ', '')}` : '';
    
    useEffect(() => {
        debugger;
        dispatch(
            pathCurrent ? 
                wsConnectionStart(WS_URL + token)
            : 
                wsConnectionStart(WS_URL + '/all')
        );

        return () => {
            (dispatch(wsConnectionClosed()));
        }
    }, []);

    return (
        <div className={orderIngredientPageStyle.page}>
            <div className={orderIngredientPageStyle.container}>
                <OrderIngreients/>
            </div>
        </div>
    );
}

export default OrderIngreientsPage;