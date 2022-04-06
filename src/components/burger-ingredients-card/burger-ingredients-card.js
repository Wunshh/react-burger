import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { 
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import { dataPropTypes } from '../../utils/types';
import { INGREDIENT_MODAL_OPEN } from '../../services/actions/modal';

import burgerCardStyle from './burger-ingredients-card.module.css';

function BurgerIngredientsCard({item}) {

    const [{opacity}, dragRef] = useDrag({
        type: "items",
        item: { item },
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const dispatch = useDispatch();
    const baseCountNumber = 0;

    const count = item.__v === baseCountNumber ? false : true;

    const hendelClick = () => {
        dispatch({
            type: INGREDIENT_MODAL_OPEN,
            item
        });
    }

    return (
        <div className={burgerCardStyle.card} onClick={hendelClick} style={{opacity}} ref={dragRef}>
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