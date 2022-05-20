import { useRef, FC, MouseEvent } from 'react';
import { 
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../utils/hooks';
import { useDrag, useDrop } from 'react-dnd';

import { DELETE_ITEM } from '../../services/actions/constructor';
import { TIngredients } from '../../utils/types';

import burgerCardStyle from './burger-constructor-card.module.css';

interface IBurgerProps {
    ingridient: TIngredients;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
  }


const BurgerConstructorCard: FC<IBurgerProps> = ({ingridient, index, moveCard}) => {

    const dispatch = useDispatch();
    const id = ingridient._id;
    const ref = useRef<HTMLDivElement>(null);   

    const handleDelete = () => {
        dispatch({
            type: DELETE_ITEM,
            id
        })
    }
    
    const [{ handlerId }, dropRef] = useDrop({
        accept: "card",
        collect(monitor) {
            return {
              handlerId: monitor.getHandlerId()
            }
        },
        hover(item: any, monitor) {
           
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
            const clientOffset: any = monitor.getClientOffset();
            const hoverClientY: number = clientOffset.y - hoverBoundingRect.top;
            

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


    const [{ opacity }, drag] = useDrag({
        type: "card",
        item: () => ({ 
            id: ingridient._id, index 
        }),
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    ingridient.type !== 'bun' && drag(dropRef(ref));

    const preventDefault = (event: MouseEvent<HTMLDivElement>) => event.preventDefault();
    
    return (
        <div 
            className={burgerCardStyle.ingredient} 
            style={{opacity}} 
            ref={ref} 
            data-handler-id={handlerId}
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

export default BurgerConstructorCard;