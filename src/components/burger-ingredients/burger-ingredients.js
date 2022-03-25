import { useEffect, useRef, useState } from 'react';
import { 
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';

import useWindowHeight from '../../utils/hooks/useWindowHeight';
import {
    desctopHeight,
    menuMobileHeight,
} from '../../utils/data';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';

import burgerIngredientsStyle from './burger-ingredients.module.css';


function BurgerIngredients({ data, onCardClick }) {

    const windowHeight = useWindowHeight();
    const bonRef = useRef();
    const souseRef = useRef();
    const fillingRef = useRef();

    const [current, setCurrent] = useState('one');
    const [deviceHeihgt, setDeviceHeihgt] = useState(765);

    useEffect(() => {
        if (windowHeight <= desctopHeight) {
            setDeviceHeihgt(menuMobileHeight);
        } else {
            setDeviceHeihgt(765);
        }
    }, [windowHeight]);

    useEffect(() => {
        if (current === "one") {
            bonRef.current.scrollIntoView({behavior: "smooth"});
        } else if (current === "two") {
            souseRef.current.scrollIntoView({behavior: "smooth"});
        } else if (current === "three") {
            fillingRef.current.scrollIntoView({behavior: "smooth"});
        }
        
    }, [current]);

    const ingridnentsFilter = (type) => data.filter(m => m.type === type);

    return (
        <section className={burgerIngredientsStyle.section}>
            <div className={burgerIngredientsStyle.menu} style={{maxHeight: deviceHeihgt}}> 
                <h1 className="text text_type_main-large mb-5">
                    Соберите бургер
                </h1>
                <div style={{ display: 'flex' }} className="mb-10">
                    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                        Соусы
                    </Tab>
        
                    <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>      
                
                <div className={burgerIngredientsStyle.ingredients}>    
                    <p className="text text_type_main-medium mb-6" ref={bonRef}>
                        Булки
                    </p>
                    <div className={burgerIngredientsStyle.cards}>
                        {ingridnentsFilter("bun").map((item) => {
                            return (
                                <BurgerIngredientsCard 
                                    key={item._id}  
                                    item={item} 
                                    onCardClick={onCardClick}
                                />
                            )
                        })
                        }
                    </div>

                    <p className="text text_type_main-medium mb-6" ref={souseRef}>
                        Соусы
                    </p>
                    <div className={burgerIngredientsStyle.cards}>
                        {ingridnentsFilter("sauce").map((item) => {
                            return (
                                <BurgerIngredientsCard 
                                    key={item._id}  
                                    item={item} 
                                    onCardClick={onCardClick}
                                />
                            )
                        })
                        }
                    </div>

                    <p className="text text_type_main-medium mb-6" ref={fillingRef}>
                        Начинки
                    </p>
                    <div className={burgerIngredientsStyle.cards}>
                        {ingridnentsFilter("main").map((item) => {
                            return (
                                <BurgerIngredientsCard 
                                    key={item._id}  
                                    item={item} 
                                    onCardClick={onCardClick}
                                />
                            )
                        })
                        }
                    </div>
                </div>  
            </div>
        </section>
    );
}

export default BurgerIngredients;

