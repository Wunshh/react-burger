import burgerCardStyle from './burger-ingredients-card.module.css';
import { dataPropTypes } from '../../utils/data';
import { 
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredientsCard({item}: {item:any}) {

    let count = item.__v === 0 ? false : true;

    return (
        <div className={burgerCardStyle.card}>
            {count && <Counter count={item.__v} size="default" />}
            <img 
                className={burgerCardStyle.img} 
                alt="изображение ингридиента"
                src={item.image}
            />
            <div className={burgerCardStyle.currency}>
                <p className="text text_type_digits-default mr-2">{item.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small" style={{textAlign: 'center'}}>
                {item.name}
            </p>
        </div>
    );
}

export default BurgerIngredientsCard;
BurgerIngredientsCard.propTypes = {
    item: dataPropTypes.isRequired
}