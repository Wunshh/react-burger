import { 
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import { dataPropTypes } from '../../utils/data';

import burgerCardStyle from './burger-constructor-card.module.css';


function BurgerConstructorCard({ingridient}) {
    
    return (
        <div className={burgerCardStyle.ingredient}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingridient.name}
                price={ingridient.price}
                thumbnail={ingridient.image_mobile}
            />
        </div>
    );
}

BurgerConstructorCard.propTypes = {
    ingridient: dataPropTypes.isRequired
}

export default BurgerConstructorCard;