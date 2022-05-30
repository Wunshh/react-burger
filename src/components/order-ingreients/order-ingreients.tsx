import { FC } from 'react';

import { TIngredients } from '../../utils/types';
import { useSelector } from '../../utils/hooks';

import orderIngreientsStyle from './order-ingreients.module.css';

const OrderIngreients: FC = () => {

    const ingredients = useSelector(store => store.ingredient.allIngredients);

    const order = {
        "_id": "6291e2e5fa747e001bd4add8",
        "ingredients": [
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c9",
            "60d3b41abdacab0026a733c9",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733d1"
        ],
        "status": "pending",
        "name": "Флюоресцентный бургер",
        "createdAt": "2022-05-28T08:52:53.781Z",
        "updatedAt": "2022-05-28T08:52:54.059Z",
        number: 15933
    };

    const orderIngredients = order.ingredients.map((item: any) => {
        return ingredients.find((m: TIngredients) => m._id === item)
    }); 

    console.log(orderIngredients);
    

    let orderStatus: string | null = null; 

    if (order.status === 'created') {
        orderStatus = 'Создан'
    } else if (order.status === 'pending') {
        orderStatus = 'Готовится'
    } else if (order.status === 'done') {
        orderStatus = 'Выполнен'
    }

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

            {/* {order.ingredients.map((item: TIngredients, index: number) => {
                            return (
                                <img 
                                    className={orderIngreientsStyle.img} 
                                    src={item.image_mobile} 
                                    key={index}
                                    alt={item.name}
                                />
                            )
                        })
            } */}
       </div>
    )
}

export default OrderIngreients;