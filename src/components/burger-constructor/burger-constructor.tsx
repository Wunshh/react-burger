import { useEffect, useState, memo, useCallback, FC } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';
import { useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import { 
    ConstructorElement,
    CurrencyIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import useWindowHeight from '../../utils/hooks/useWindowHeight';
import {
    desctopHeight,
    mainHeight,
    selectedHeight
} from '../../utils/data';
import { sendOrder } from '../../services/actions/order';
import BurgerConstructorCard from '../burger-constructor-card/burger-constructor-card';
import { ORDER_MODAL_OPEN } from '../../services/actions/modal';
import { ADD_ITEM, MOVE_ITEM } from '../../services/actions/constructor';
import { TIngredients } from '../../utils/types';

import burgerConstructorStyle from './burger-constructor.module.css';

type TMoveCallback = (
    dragIndex: number,
    hoverIndex: number
) => void;


const BurgerConstructor: FC = () => {

    const ingredients = useSelector(store => store.ingredient.constructorIngredients);
    const dispatch = useDispatch();
    const history = useHistory();

    const windowHeight = useWindowHeight();
    const [deviceHeihgt, setDeviceHeihgt] = useState(440);
    const [selectedDeviceHeight, setSelectedDeviceHeight] = useState(620);
    const userName = useSelector(store => store.loginFormReducer.form.name);
    const userLogin = useSelector(store => store.loginFormReducer.loginSuccess);
    
    useEffect(() => {
        if (windowHeight <= desctopHeight) {
            setDeviceHeihgt(mainHeight);
            setSelectedDeviceHeight(selectedHeight)
        } else {
            setDeviceHeihgt(440);
            setSelectedDeviceHeight(620)
        }
    }, [windowHeight]);

    const [, dropTarget] = useDrop({
        accept: "items",
        drop(item: any) {
            const newItem = {
                ...item,
                uuid: uuidv4()
            }
            dispatch({
                type: ADD_ITEM,
                ...newItem
            });
        }
    });

    const bun = ingredients.find((m: TIngredients) => m.type === 'bun'); 

    const mainIngredients = ingredients.filter((m: TIngredients) => m.type !== 'bun');

    const order = bun !== undefined ? mainIngredients.concat(bun) : undefined;
        
    
    function hendelClick() {

        if(userName || userLogin) {
            dispatch({
                type: ORDER_MODAL_OPEN
            });
            if (order) {
                dispatch(sendOrder(order.map((item: TIngredients) => item._id)));
            } 
        } else {
            history.push('/login');
        }
    }

    const bunPrice = bun === undefined ? 0 : bun.price;

    function calculateCost() {
        return (mainIngredients.reduce((sum: number, current: TIngredients): number => sum + current.price, 0) + bunPrice * 2);
    }

    const moveCard = useCallback<TMoveCallback>((dragIndex, hoverIndex) => { 
        const dragCard = mainIngredients[dragIndex];
        const newCards = [...mainIngredients];
        newCards.splice(dragIndex, 1);
        newCards.splice(hoverIndex, 0, dragCard);
      
        dispatch({
            type: MOVE_ITEM,
            newCards
        })
    }, [dispatch, mainIngredients]);

    return (
        <section className={burgerConstructorStyle.section} ref={dropTarget}>
            {ingredients &&
                <div 
                    className={burgerConstructorStyle.selected} 
                    style={{maxHeight: selectedDeviceHeight}} 
                >
                    {bun && <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (????????)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />}
                    <div className={burgerConstructorStyle.main} style={{maxHeight: deviceHeihgt}}>
                        {mainIngredients.map((item: TIngredients, index: number) => {
                            return (
                                <BurgerConstructorCard 
                                    key={item.uuid}
                                    ingridient={item} 
                                    index={index} 
                                    moveCard={moveCard}
                                />
                            );
                        })}
                    </div>
                    {bun &&  <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (??????)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />}
                </div> 
            }

            <div className={burgerConstructorStyle.order}>
                <div className={burgerConstructorStyle.prise}>
                    <p className="text text_type_digits-medium mr-2">{mainIngredients && calculateCost()}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button 
                    type="primary" 
                    size="large" 
                    onClick={ingredients && hendelClick} 
                    disabled={order && bun && order.length > 1 ? false : true}
                >
                    ???????????????? ??????????
                </Button>
            </div>
        </section>
    );
}

export default memo(BurgerConstructor);

