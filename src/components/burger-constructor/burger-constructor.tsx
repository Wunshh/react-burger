import { useEffect, useState } from 'react';
import burgerConstructorStyle from './burger-constructor.module.css';
import { data } from '../../utils/data';
import {
    desctopHeight,
    mainHeight,
    selectedHeight
} from '../../utils/data';
import useWindowHeight from '../../utils/hooks/useWindowHeight';
import { 
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor() {

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

    return (
        <section className={burgerConstructorStyle.section}>
            <div className={burgerConstructorStyle.selected} style={{height: selectedDeviceHeight}}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={data[0].price}
                    thumbnail={data[0].image_mobile}
                />
                <div className={burgerConstructorStyle.main} style={{height: deviceHeihgt}}>
                    <div className={burgerConstructorStyle.ingredient}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={data[5].name}
                            price={data[5].price}
                            thumbnail={data[5].image_mobile}
                        />
                    </div>
                    <div className={burgerConstructorStyle.ingredient}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={data[4].name}
                            price={data[4].price}
                            thumbnail={data[4].image_mobile}
                        />
                    </div>
                    <div className={burgerConstructorStyle.ingredient}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={data[7].name}
                            price={data[7].price}
                            thumbnail={data[7].image_mobile}
                        />
                    </div>
                    <div className={burgerConstructorStyle.ingredient}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={data[8].name}
                            price={data[8].price}
                            thumbnail={data[8].image_mobile}
                        />
                    </div>
                    <div className={burgerConstructorStyle.ingredient}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={data[8].name}
                            price={data[8].price}
                            thumbnail={data[8].image_mobile}
                        />
                    </div>
                    <div className={burgerConstructorStyle.ingredient}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={data[8].name}
                            price={data[8].price}
                            thumbnail={data[8].image_mobile}
                        />
                    </div>
                    <div className={burgerConstructorStyle.ingredient}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={data[8].name}
                            price={data[8].price}
                            thumbnail={data[8].image_mobile}
                        />
                    </div>
                    <div className={burgerConstructorStyle.ingredient}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={data[8].name}
                            price={data[8].price}
                            thumbnail={data[8].image_mobile}
                        />
                    </div>
                </div>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={data[0].price}
                    thumbnail={data[0].image_mobile}
                />
            </div>

            <div className={burgerConstructorStyle.order}>
                <div className={burgerConstructorStyle.prise}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;

