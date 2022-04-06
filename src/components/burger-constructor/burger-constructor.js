import { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
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
import { ADD_ITEM } from '../../services/actions/constructor';

import burgerConstructorStyle from './burger-constructor.module.css';


function BurgerConstructor() {

    const ingredients = useSelector(store => store.ingredient.constructorIngredients);
    const dispatch = useDispatch();

    const windowHeight = useWindowHeight();
    const [deviceHeihgt, setDeviceHeihgt] = useState(440);
    const [selectedDeviceHeight, setSelectedDeviceHeight] = useState(620);

    useEffect(() => {
        if (windowHeight <= desctopHeight) {
            setDeviceHeihgt(mainHeight);
            setSelectedDeviceHeight(selectedHeight)
        } else {
            setDeviceHeihgt(440);
            setSelectedDeviceHeight(620)
        }
    }, [windowHeight]);

    const [{isHover}, dropTarget] = useDrop({
        accept: "items",
        drop(item) {
            dispatch({
                type: ADD_ITEM,
                ...item
            });
        }
    });

    const bun = ingredients.find((m) => m.type === 'bun'); 

    const mainIngredients = ingredients.filter((m) => m.type !== 'bun');

    const order = mainIngredients.concat(bun);

    function hendelClick() {
        dispatch({
            type: ORDER_MODAL_OPEN
        });
        dispatch(sendOrder(order.map((item) => item._id)));
    }

    const bunPrice = bun === undefined ? 0 : bun.price;

    function calculateCost() {
        return (mainIngredients.reduce((sum, current) => sum + current.price, 0) + bunPrice * 2);
    }

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
                        {mainIngredients.map((item, index) => {
                            return (
                                <BurgerConstructorCard key={index} ingridient={item}/>
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
                <Button type="primary" size="large" onClick={ingredients && hendelClick}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    onButtonClick: PropTypes.func,
    createOrder: PropTypes.func
}

export default memo(BurgerConstructor);

