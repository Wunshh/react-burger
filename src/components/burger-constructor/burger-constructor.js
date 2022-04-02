import { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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
import { sendOrder } from '../../services/actions/actions';
import BurgerConstructorCard from '../burger-constructor-card/burger-constructor-card';
import { ORDER_MODAL_OPEN } from '../../services/actions/actions';

import burgerConstructorStyle from './burger-constructor.module.css';


function BurgerConstructor() {

    const ingredients = useSelector(store => store.burger.constructorIngredients);

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

    const bun = ingredients !== null ? ingredients.find((m) => m.type === 'bun') : null; 
    const mainIngredients = ingredients !== null ? ingredients.filter((m) => m.type !== 'bun') : null;

    const order = ingredients !== null ? mainIngredients.concat(bun) : null;

    function hendelClick() {
        dispatch({
            type: ORDER_MODAL_OPEN
        });
        dispatch(sendOrder(order.map((item) => item._id)));
    }

    function calculateCost() {
        return (mainIngredients.reduce((sum, current) => sum + current.price, 0) + bun.price * 2);
    }

    return (
 
        <section className={burgerConstructorStyle.section}>
            {ingredients &&
                <div className={burgerConstructorStyle.selected} style={{maxHeight: selectedDeviceHeight}}>
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
                    <p className="text text_type_digits-medium mr-2">{bun && calculateCost()}</p>
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

