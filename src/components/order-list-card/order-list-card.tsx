import { FC } from 'react';
import { Route, Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import moment from 'moment';
import 'moment/locale/ru';

import { useSelector, useDispatch } from '../../utils/hooks';
import { ORDER_INGREDIENT_MODAL_OPEN } from '../../services/actions/modal';
import { TIngredients, TOrders } from '../../utils/types';

import orderCardStyle from './order-list-card.module.css';

interface IOrderListCard {
    item: TOrders;
}

const OrderListCard: FC<IOrderListCard> = ({ item }) => {  
     
    const ingredients = useSelector(store => store.ingredient.allIngredients);
    const dispatch = useDispatch();
    let imageOpacity: boolean = false;

    const orderIngredients = (item.ingredients.map((item) => {
        return ingredients.find((m: TIngredients) => m._id === item)
    })).filter((item => item !== null && item !== undefined)); 
    
    const price = orderIngredients !== null && orderIngredients.reduce((sum, current: any): number => sum + current.price, 0);

    const deleteDuplicate = (orderIngredients.filter((item, index: number) => {
       return orderIngredients.indexOf(item) === index
    })).filter((item) => item !== undefined);
    
    const bun = deleteDuplicate.filter((item) => item?.type === 'bun');

    const newOrderIngredients = bun ? bun.concat(deleteDuplicate.filter((item) => item?.type !== 'bun')) : deleteDuplicate.filter((item) => item?.type !== 'bun');
    
    if (newOrderIngredients.length > 6) {
        imageOpacity = true;
    }    

    let orderStatus: string | null = null; 

    if (item.status === 'created') {
        orderStatus = 'Создан'
    } else if (item.status === 'pending') {
        orderStatus = 'Готовится'
    } else if (item.status === 'done') {
        orderStatus = 'Выполнен'
    }

    const location = useLocation();
    const orderNumber = (item['_id']).toString();

    const hendelClick = () => {
        dispatch({
            type: ORDER_INGREDIENT_MODAL_OPEN,
            item
        });
    }
    
    return (
        <Link 
            className={orderCardStyle.link}
            to={{
                pathname: `${location.pathname}/${orderNumber}`,
                state: { background: location }
            }}
        >
            <div className={orderCardStyle.card} onClick={hendelClick}>
                <div className={orderCardStyle.top}>
                    <div className="text text_type_digits-default">
                        #{item.number}
                    </div>
                    <div className="text text_type_main-default text_color_inactive">
                        {moment(item.createdAt).calendar()} i-GMT+3
                    </div>
                </div>
                <p className="text text_type_main-medium mt-6 name">
                    {item.name}
                </p>

                <Route exact path="/profile/orders"> 
                    <p className={orderStatus === 'Выполнен' ? "text text_type_main-default mt-2 color" : "text text_type_main-default mt-2"}> 
                        {orderStatus}
                    </p>
                </Route>

                <div className={orderCardStyle.bottom}>
                    <div className={orderCardStyle.images}> 
                        {newOrderIngredients.slice(0, 6).map((item: any) => {
                            return (
                                <img 
                                    className={orderCardStyle.img} 
                                    src={item.image_mobile} 
                                    key={item._id}
                                    alt={item.name}
                                />
                            )
                        })
                        }
                        <p className={imageOpacity ? orderCardStyle.opacity : orderCardStyle.none}> 
                            + {newOrderIngredients.length - 6}
                        </p>
                    </div>
                    <div className={orderCardStyle.prise}>
                        <p className="text text_type_digits-medium mr-2">{price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default OrderListCard;