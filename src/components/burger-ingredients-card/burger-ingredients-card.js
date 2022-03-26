import PropTypes from 'prop-types';
import { 
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import { dataPropTypes } from '../../utils/types';

import burgerCardStyle from './burger-ingredients-card.module.css';

function BurgerIngredientsCard({item, onCardClick}) {

    const baseCountNumber = 0;

    const count = item.__v === baseCountNumber ? false : true;

    function handleClick() {
        onCardClick(item);
    }

    return (
        <div className={burgerCardStyle.card} onClick={handleClick}>
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
            <p className="text text_type_main-small text-align">
                {item.name}
            </p>
        </div>
    );
}

BurgerIngredientsCard.propTypes = {
    item: dataPropTypes.isRequired,
    onCardClick: PropTypes.func
}

export default BurgerIngredientsCard;