import burgerCardStyle from './burger-constructor-card.module.css';
import { dataPropTypes } from '../../utils/data';
import { 
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructorCard({ingridient}: {ingridient: any}) {
    
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

export default BurgerConstructorCard;

BurgerConstructorCard.propTypes = {
    ingridient: dataPropTypes.isRequired
}