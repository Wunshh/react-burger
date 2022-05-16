import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { 
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import { dataPropTypes } from '../../utils/types';
import { INGREDIENT_MODAL_OPEN } from '../../services/actions/modal';

import burgerCardStyle from './burger-ingredients-card.module.css';
import { TIngredients } from '../../utils/types';

interface IBurgerIngredients {
    item: TIngredients;
    onCardClick: () => void;
}


const BurgerIngredientsCard: FC<IBurgerIngredients> = ({item, onCardClick}) => {

    const [{opacity}, dragRef] = useDrag({
        type: "items",
        item: { item },
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const location = useLocation();

    const dispatch = useDispatch();
    const baseCountNumber = 0;

    const count = item.__v === baseCountNumber ? false : true;

    const hendelClick = () => {
        onCardClick();
        dispatch({
            type: INGREDIENT_MODAL_OPEN,
            item
        });
    }

    const ingredientId = item['_id'];

    return (
        <Link 
            className={burgerCardStyle.link}
            key={ingredientId}
            to={{
                pathname: `/ingredients/${ingredientId}`,
                state: { background: location }
            }}
        >
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
        </Link>
    );
}

export default BurgerIngredientsCard;