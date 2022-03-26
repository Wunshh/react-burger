import { useEffect, useState } from 'react';
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
    selectedHeight,
    selectedIngridients
} from '../../utils/data';
import BurgerConstructorCard from '../burger-constructor-card/burger-constructor-card';

import burgerConstructorStyle from './burger-constructor.module.css';


function BurgerConstructor({ onButtonClick }) {

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

    const bun = selectedIngridients.find((m) => m.type === 'bun'); 

    return (
        <section className={burgerConstructorStyle.section}>
            <div className={burgerConstructorStyle.selected} style={{maxHeight: selectedDeviceHeight}}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />
                <div className={burgerConstructorStyle.main} style={{maxHeight: deviceHeihgt}}>
                    {selectedIngridients.filter((m) => m.type !== 'bun').map((item, index) => {
                        return (
                            <BurgerConstructorCard key={index} ingridient={item}/>
                        )
                    })}
                </div>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />
            </div>

            <div className={burgerConstructorStyle.order}>
                <div className={burgerConstructorStyle.prise}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={onButtonClick}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    onButtonClick: PropTypes.func
}

export default BurgerConstructor;

