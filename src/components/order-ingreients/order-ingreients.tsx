import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredients, TOrders } from '../../utils/types';
import { useSelector, useDispatch } from '../../utils/hooks';
import { getIngredientsData } from '../../services/actions/ingredients'; 

import orderIngreientsStyle from './order-ingreients.module.css';

const OrderIngreients = () => {

    const dispatch = useDispatch();
    const orderNumber: {orderNumber: string} = useParams(); 
    
    const ingredients = useSelector(store => store.ingredient.allIngredients);
    let order = useSelector(store => store.ingredient.orderIngredient);
    const data = useSelector(store => store.wsReduser.orders);
    let newOrder;

    if (order === null || order === undefined) {
        newOrder = data.find((item: TOrders) => (item.number).toString() === orderNumber.orderNumber);
        order = newOrder ? newOrder : null
    }

    useEffect(() => {
        dispatch(getIngredientsData());
    }, [dispatch]);

    const orderIngredients = order !== null ? order.ingredients.map((item: string) => {
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

    if (order !== null && order.status === 'created') {
        orderStatus = 'Создан'
    } else if (order !== null && order.status === 'pending') {
        orderStatus = 'Готовится'
    } else if (order !== null && order.status === 'done') {
        orderStatus = 'Выполнен'
    }

    const time = order !== null && order.createdAt.slice(11, 16);
    const today = new Date().toISOString().split('T')[0];

    let day: string | null = null;
    const dayOfOrder = order !== null && order.createdAt.slice(8,10);

    if (today.slice(8) === dayOfOrder) {
        day = "Сегодня"
    } else if (Number(today.slice(8)) - 1 === Number(dayOfOrder)) {
        day = "Вчера"
    } else {
        day = (Number(today.slice(8)) - Number(dayOfOrder)).toString() + ' дня назад'      
    }

    const price = orderIngredients !== null && orderIngredients.reduce((sum, current: any): number => sum + current.price, 0);

    return (
        order !== null ? 
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
                {correctOrderIngredients.map((item: any) => {
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
                    {day}, {time} i-GMT+3
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