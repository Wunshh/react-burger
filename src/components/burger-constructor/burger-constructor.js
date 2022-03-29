import { useContext, useEffect, useState } from 'react';
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
import { BurgerConstructorContext } from '../../contexts/burger-constructor-context';
import BurgerConstructorCard from '../burger-constructor-card/burger-constructor-card';

import burgerConstructorStyle from './burger-constructor.module.css';


function BurgerConstructor({ onButtonClick, createOrder }) {

    const windowHeight = useWindowHeight();

    const [deviceHeihgt, setDeviceHeihgt] = useState(440);
    const [selectedDeviceHeight, setSelectedDeviceHeight] = useState(620);

    const ingredients = useContext(BurgerConstructorContext);

    useEffect(() => {
        if (windowHeight <= desctopHeight) {
            setDeviceHeihgt(mainHeight);
            setSelectedDeviceHeight(selectedHeight)
        } else {
            setDeviceHeihgt(440);
            setSelectedDeviceHeight(620)
        }
    }, [windowHeight]);

    const bun = ingredients.find((m) => m.type === 'bun'); 
    const mainIngredients = ingredients.filter((m) => m.type !== 'bun');
    const ingredientsPrice = mainIngredients.map((item) => item.price);

    const order = mainIngredients.concat(bun);

    function hendelClick() {
        onButtonClick();
        createOrder(order.map((item) => item._id));
    }

    function calculateCost() {
        return (ingredientsPrice.reduce((sum, current) => sum + current, 0)) + bun.price * 2;
    }

    return (
        <section className={burgerConstructorStyle.section}>
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

            <div className={burgerConstructorStyle.order}>
                <div className={burgerConstructorStyle.prise}>
                    <p className="text text_type_digits-medium">{ingredientsPrice && bun && calculateCost()}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={hendelClick}>
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

export default BurgerConstructor;

