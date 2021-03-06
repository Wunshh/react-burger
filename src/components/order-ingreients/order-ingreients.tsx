import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import moment from 'moment';
import 'moment/locale/ru';

import { TIngredients, TOrders } from '../../utils/types';
import { useSelector, useDispatch } from '../../utils/hooks';
import { getIngredientsData } from '../../services/actions/ingredients'; 

import orderIngreientsStyle from './order-ingreients.module.css';

const OrderIngreients = () => {

    const dispatch = useDispatch();
    const orderNumber: {orderNumber: string} = useParams(); 
    
    const ingredients = useSelector(store => store.ingredient.allIngredients);
    const data = useSelector(store => store.wsReduser.orders);
    const order = data && data.find((item: TOrders) => item._id === orderNumber.orderNumber);
    
    useEffect(() => {
        dispatch(getIngredientsData());
    }, [dispatch]);

    const orderIngredients = order !== undefined ? order.ingredients.map((item: string) => {
        return ingredients.find((m: TIngredients) => m._id === item)
    }) : [];

    const newOrderIngredients = orderIngredients.map((item) => {
        return {...item, num: (orderIngredients.filter(m => m?._id === item?._id)).length} 
    });

    const deleteDuplicate = newOrderIngredients.reduce((prev: Array<TIngredients>, curr: any) => {
        if (!prev.find((v: TIngredients) => v._id === curr._id)) {
            prev.push(curr);
        }
        return prev;
    }, []);

    const bun = deleteDuplicate.filter((item: TIngredients) => item?.type === 'bun');

    const correctOrderIngredients = bun.concat(deleteDuplicate.filter((item: TIngredients) => item?.type !== 'bun'));   
    
    let orderStatus: string | null = null;

    if (order !== undefined && order.status === 'created') {
        orderStatus = 'Создан'
    } else if (order !== undefined && order.status === 'pending') {
        orderStatus = 'Готовится'
    } else if (order !== undefined && order.status === 'done') {
        orderStatus = 'Выполнен'
    }

    const price = orderIngredients !== null && orderIngredients.reduce((sum, current: any): number => sum + current.price, 0);

    return (
        order !== undefined ? 
       <div className={orderIngreientsStyle.card}>
            <p className="text text_type_digits-default mb-10" style={{alignSelf: 'center'}}> 
                #{order.number}
            </p>
            <p className="text text_type_main-medium mb-3"> 
                {order.name}
            </p>
            <p className={orderStatus === 'Выполнен' ? "text text_type_main-default mt-2 color" : "text text_type_main-default mt-2"}>
                {orderStatus}
            </p>
            <p className="text text_type_main-medium mt-15 mb-6">
                Состав: 
            </p>
            <div className={orderIngreientsStyle.ingredients}>
                {correctOrderIngredients.map((item: TIngredients) => {
                        return (
                            <div className={orderIngreientsStyle.data} key={item._id}>
                                <img 
                                    className={orderIngreientsStyle.img} 
                                    src={item.image_mobile} 
                                    alt={item.name}
                                />
                                <p className="text text_type_main-default mr-4 ml-4" style={{width: 320}}>
                                    {item.name}
                                </p>
                                <div className={orderIngreientsStyle.prise}>
                                    <p className="text text_type_digits-default mr-2">{item.type === 'bun' ? 2 : item.num} x {item.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>  
                            </div>  
                        )
                    })
                }
            </div>
            <div className={orderIngreientsStyle.footer}>
                <div className="text text_type_main-default text_color_inactive mt-10">
                    {moment(order.createdAt).calendar()}, i-GMT+3
                </div>
                <div className={orderIngreientsStyle.footer__price}>
                    <p className="text text_type_digits-default mr-2">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
       </div>
       :
       null
    )
}

export default OrderIngreients;