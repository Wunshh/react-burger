import { useEffect, useRef, useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import useWindowHeight from '../../utils/hooks/useWindowHeight';
import {
    desctopHeight,
    menuMobileHeight,
} from '../../utils/data';
import { getIngredientsData } from '../../services/actions/ingredients';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';

import burgerIngredientsStyle from './burger-ingredients.module.css';


function BurgerIngredients({ onCardClick }) {

    const dispatch = useDispatch();
    const windowHeight = useWindowHeight();
    const bonRef = useRef();
    const souseRef = useRef();
    const fillingRef = useRef();
    const allIngredients = useRef();

    const [current, setCurrent] = useState('one');
    const [deviceHeihgt, setDeviceHeihgt] = useState(765);

    const ingredients = useSelector(store => store.ingredient.allIngredients);

    useEffect(() => {
        dispatch(getIngredientsData());
    }, [dispatch]);

    const hendelScroll = () => {
        const top = allIngredients.current.scrollTop + allIngredients.current.offsetTop;
        if (top < souseRef.current.offsetTop) {
            setCurrent('one');
        } else if (fillingRef.current.offsetTop > top && top >= souseRef.current.offsetTop) {
            setCurrent('two');
        } else {
            setCurrent('three');
        }
    };

    useEffect(() => {
        if (windowHeight <= desctopHeight) {
            setDeviceHeihgt(menuMobileHeight);
        } else {
            setDeviceHeihgt(765);
        }
    }, [windowHeight]);

    const tabClick = (currentName) => {
        setCurrent(currentName);

        if (currentName === "one") {
            bonRef.current.scrollIntoView({ block: "start", behavior: "smooth"});
        } else if (currentName === "two") {
            souseRef.current.scrollIntoView({ block: "start", behavior: "smooth"});
        } else if (currentName === "three") {
            fillingRef.current.scrollIntoView({ block: "start", behavior: "smooth"});
        }
    }
    
    const ingridnentsFilter = (type) => ingredients.filter(m => m.type === type);

    return (
        <section className={`${burgerIngredientsStyle.section} ${'navigation'}`}>
            <div className={burgerIngredientsStyle.menu} style={{maxHeight: deviceHeihgt}}> 
                <h1 className="text text_type_main-large mb-5">
                    Соберите бургер
                </h1>
                <div style={{ display: 'flex' }} className="mb-10">
                    <Tab value="one" active={current === 'one'} onClick={tabClick}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={tabClick}>
                        Соусы
                    </Tab>
        
                    <Tab value="three" active={current === 'three'} onClick={tabClick}>
                        Начинки
                    </Tab>
                </div>      
                
                <div className={burgerIngredientsStyle.ingredients} ref={allIngredients} onScroll={hendelScroll}>    
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

BurgerIngredients.propTypes = {
    onCardClick: PropTypes.func
}

export default memo(BurgerIngredients);

