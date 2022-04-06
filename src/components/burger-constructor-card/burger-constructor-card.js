import { 
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';

import { dataPropTypes } from '../../utils/types';
import { DELETE_ITEM } from '../../services/actions/constructor';

import burgerCardStyle from './burger-constructor-card.module.css';


function BurgerConstructorCard({ingridient}) {

    const dispatch = useDispatch();
    const id = ingridient._id;

    const handleDelete = () => {
        dispatch({
            type: DELETE_ITEM,
            id
        })
    }
    
    return (
        <div className={burgerCardStyle.ingredient}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingridient.name}
                price={ingridient.price}
                thumbnail={ingridient.image_mobile}
                handleClose={() => handleDelete()}
            />
        </div>
    );
}

BurgerConstructorCard.propTypes = {
    ingridient: dataPropTypes.isRequired
}

export default BurgerConstructorCard;