import burgerCardStyle from './burger-constructor-card.module.css';
import { 
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructorCard({ingridient}: {ingridient: any}) {

    console.log(ingridient);
    
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