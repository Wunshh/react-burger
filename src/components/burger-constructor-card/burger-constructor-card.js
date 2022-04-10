import { useRef } from 'react';
import { 
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

import { dataPropTypes } from '../../utils/types';
import { DELETE_ITEM } from '../../services/actions/constructor';

import burgerCardStyle from './burger-constructor-card.module.css';


function BurgerConstructorCard({ingridient, index, moveCard}) {

    const dispatch = useDispatch();
    const id = ingridient._id;
    const ref = useRef(null); 

    const handleDelete = () => {
        dispatch({
            type: DELETE_ITEM,
            id
        })
    }

    const [{ opacity }, drag] = useDrag({
        type: "card",
        item: () => ({ 
            id: ingridient.id, index 
        }),
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    
    const [{ handlerId }, dropRef] = useDrop({
        accept: "card",
        collect(monitor) {
            return {
              handlerId: monitor.getHandlerId()
            }
        },
        hover(item, monitor) {
           
            if (!ref.current) {
                return;
            }
           
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        } 
    });

    drag(dropRef(ref));

    const preventDefault = (e) => e.preventDefault();
    
    return (
        <div 
            className={burgerCardStyle.ingredient} 
            style={{opacity}} 
            ref={ref} 
            id={handlerId} 
            onDrop={preventDefault}
        >
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