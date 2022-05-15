import { useEffect, useState, memo, useCallback, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

type TButtonClick = {
    onButtonClick: () => void;
};  


const BurgerConstructor: FC<TButtonClick> = ({ onButtonClick = () => null }) => {

    const ingredients = useSelector((store: any) => store.ingredient.constructorIngredients);
    const dispatch = useDispatch();
    const history = useHistory();

    const windowHeight = useWindowHeight();
    const [deviceHeihgt, setDeviceHeihgt] = useState(440);
    const [selectedDeviceHeight, setSelectedDeviceHeight] = useState(620);
    const loginSuccess = useSelector((store: any) => store.loginFormReducer.loginSuccess);


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

    const order = mainIngredients.concat(bun);

    function hendelClick() {
        if(!loginSuccess) {
            history.push('/login');
        } else {
            onButtonClick();
            dispatch({
                type: ORDER_MODAL_OPEN
            });
            dispatch(sendOrder(order.map((item: TIngredients) => item._id)));
        }
    }

    const bunPrice = bun === undefined ? 0 : bun.price;

    function calculateCost() {
        return (mainIngredients.reduce((sum: number, current: number): number => sum + current.price, 0) + bunPrice * 2);
    }


    const moveCard = useCallback((dragIndex, hoverIndex) => { 
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
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />}
                    <div className={burgerConstructorStyle.main} style={{maxHeight: deviceHeihgt}}>
                        {mainIngredients.map((item: any, index: number) => {
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
                        text={`${bun.name} (низ)`}
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
                    disabled={bun && order.length > 1 ? false : true}
                >
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default memo(BurgerConstructor);

