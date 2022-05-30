import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector } from '../../utils/hooks';
import { TIngredients } from '../../utils/types';

import orderCardStyle from './order-list-card.module.css';

interface IOrderListCard {
    item: any
}

const OrderListCard: FC<IOrderListCard> = ({item}) => {

    const ingredients = useSelector(store => store.ingredient.allIngredients);
    let imageOpacity: boolean = false;

    const orderIngredients = item.ingredients.map((item: any) => {
        return ingredients.find((m: TIngredients) => m._id === item)
    }); 
    
    const price = orderIngredients.reduce((sum: number, current: TIngredients): number => sum + current.price, 0)

    const deleteDuplicate = orderIngredients.filter((item: TIngredients, index: number) => 
        orderIngredients.indexOf(item) === index
    );
    
    if (orderIngredients.length > 6) {
        imageOpacity = true;
    }

    // const today =  item.createdAt.split('T')[0];
    // console.log(today.split('-').reverse().join('-'));

    const time = item.createdAt.slice(11, 16);
    const today = new Date().toISOString().split('T')[0];

    let day: string | null = null;
    const dayOfOrder = item.createdAt.slice(8,10);

    if (today.slice(8) === dayOfOrder) {
        day = "Сегодня"
    } else if (Number(today.slice(8)) - 1 == dayOfOrder) {
        day = "Вчера"
    } else {
        day = (Number(today.slice(8)) - Number(dayOfOrder)).toString() + " дня назад"
    }
    

    return (
        <div className={orderCardStyle.card}>
            <div className={orderCardStyle.top}>
                <div className="text text_type_digits-default">
                    #{item.number}
                </div>
                <div className="text text_type_main-default text_color_inactive">
                    {day}, {time} i-GMT+3
                </div>
            </div>
            <p className="text text_type_main-medium mt-6 mb-6 name">
                {item.name}
            </p>
            <div className={orderCardStyle.bottom}>
                <div className={orderCardStyle.images}> 
                    {deleteDuplicate.slice(0, 6).map((item: TIngredients, index: number) => {
                        return (
                            <img 
                                className={orderCardStyle.img} 
                                src={item.image_mobile} 
                                key={index}
                                alt={item.name}
                            />
                        )
                    })
                    }
                    <p className={imageOpacity ? orderCardStyle.opacity : orderCardStyle.none}> 
                        + {orderIngredients.length - 6}
                    </p>
                </div>
                <div className={orderCardStyle.prise}>
                    <p className="text text_type_digits-medium mr-2">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
}

export default OrderListCard;