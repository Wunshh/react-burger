import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredients } from '../../utils/types';
import { useSelector } from '../../utils/hooks';

import orderIngreientsStyle from './order-ingreients.module.css';

const OrderIngreients: FC = () => {

    const ingredients = useSelector(store => store.ingredient.allIngredients);

    const order = {
        "_id": "6291e2e5fa747e001bd4add8",
        "ingredients": [
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c9",
            "60d3b41abdacab0026a733c9",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733d1",
            "60d3b41abdacab0026a733c7"
        ],
        "status": "pending",
        "name": "Флюоресцентный бургер",
        "createdAt": "2022-05-28T08:52:53.781Z",
        "updatedAt": "2022-05-28T08:52:54.059Z",
        number: 15933
    };

    const orderIngredients = order.ingredients.map((item: string) => {
        return ingredients.find((m: TIngredients) => m._id === item)
    });

    const mainInggredients = orderIngredients.filter((item: any) => item.type !== "bun"); 

    const allIngredients = (orderIngredients.filter((item: any) => item.type === "bun")).slice(0, 1).concat(mainInggredients);     

    let orderStatus: string | null = null; 

    if (order.status === 'created') {
        orderStatus = 'Создан'
    } else if (order.status === 'pending') {
        orderStatus = 'Готовится'
    } else if (order.status === 'done') {
        orderStatus = 'Выполнен'
    }

    const time = order.createdAt.slice(11, 16);
    const today = new Date().toISOString().split('T')[0];

    let day: string | null = null;
    const dayOfOrder = order.createdAt.slice(8,10);

    if (today.slice(8) === dayOfOrder) {
        day = "Сегодня"
    } else if (Number(today.slice(8)) - 1 === Number(dayOfOrder)) {
        day = "Вчера"
    } else {
        day = (Number(today.slice(8)) - Number(dayOfOrder)).toString() + " дня назад"
    }

    const price = orderIngredients.reduce((sum, current: any): number => sum + current.price, 0);

    return (
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
                {allIngredients.map((item: any, index: number) => {
                        return (
                            <>
                                <div className={orderIngreientsStyle.data}>
                                    <img 
                                        className={orderIngreientsStyle.img} 
                                        src={item.image_mobile} 
                                        key={index}
                                        alt={item.name}
                                    />
                                    <p className="text text_type_main-default mr-4 ml-4" style={{width: 320}}>
                                        {item.name}
                                    </p>
                                    <div className={orderIngreientsStyle.prise}>
                                        <p className="text text_type_digits-default mr-2">{item.type === 'bun' ? 2 : 1} x {item.price}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>  
                                </div>
                            </>
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
    )
}

export default OrderIngreients;