import { useEffect, useRef, useState, memo } from 'react';
import { useSelector, useDispatch } from '../../utils/hooks';
import { 
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';

import useWindowHeight from '../../utils/hooks/useWindowHeight';
import {
    desctopHeight,
    menuMobileHeight,
} from '../../utils/data';
import { getIngredientsData } from '../../services/actions/ingredients';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import { TIngredients } from '../../utils/types';

import burgerIngredientsStyle from './burger-ingredients.module.css';

function BurgerIngredients() {

    const dispatch = useDispatch();
    const windowHeight = useWindowHeight();
    const bonRef = useRef<HTMLParagraphElement>(null);
    const souseRef = useRef<HTMLParagraphElement>(null);
    const fillingRef = useRef<HTMLParagraphElement>(null);
    const allIngredientsRef = useRef<HTMLDivElement>(null);

    const [current, setCurrent] = useState('one');
    const [deviceHeihgt, setDeviceHeihgt] = useState(765);

    const ingredients = useSelector(store => store.ingredient.allIngredients);

    useEffect(() => {
        dispatch(getIngredientsData());
    }, [dispatch]);

    const hendelScroll = () => {
        const top: any = allIngredientsRef.current !== null ? allIngredientsRef.current.scrollTop + allIngredientsRef.current.offsetTop: null;
        if (souseRef.current !== null && top < souseRef.current.offsetTop) {
            setCurrent('one');
        } else if (
                fillingRef.current !== null && 
                souseRef.current !== null && 
                fillingRef.current.offsetTop > top && top >= souseRef.current.offsetTop
            ) {
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

    const tabClick = (currentName: string): void => {
        setCurrent(currentName);

        if (currentName === "one" && bonRef.current !== null) {
            bonRef.current.scrollIntoView({ block: "start", behavior: "smooth"});
        } else if (currentName === "two" && souseRef.current !== null) {
            souseRef.current.scrollIntoView({ block: "start", behavior: "smooth"});
        } else if (currentName === "three" && fillingRef.current !== null) {
            fillingRef.current.scrollIntoView({ block: "start", behavior: "smooth"});
        }
    }
    
    const ingridnentsFilter = (type: string): Array<TIngredients> => ingredients.filter((m: TIngredients) => m.type === type);

    return (
        <section className={`${burgerIngredientsStyle.section} ${'navigation'}`}>
            <div className={burgerIngredientsStyle.menu} style={{maxHeight: deviceHeihgt}}> 
                <h1 className="text text_type_main-large mb-5">
                    ???????????????? ????????????
                </h1>
                <div style={{ display: 'flex' }} className="mb-10">
                    <Tab value="one" active={current === 'one'} onClick={tabClick}>
                        ??????????
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={tabClick}>
                        ??????????
                    </Tab>
        
                    <Tab value="three" active={current === 'three'} onClick={tabClick}>
                        ??????????????
                    </Tab>
                </div>      
                
                <div className={burgerIngredientsStyle.ingredients} ref={allIngredientsRef} onScroll={hendelScroll}>    
                    <p className="text text_type_main-medium mb-6" ref={bonRef}>
                        ??????????
                    </p>
                    <div className={burgerIngredientsStyle.cards}>
                        {ingridnentsFilter("bun").map((item: TIngredients) => {
                            return (
                                <BurgerIngredientsCard 
                                    key={item._id}  
                                    item={item} 
                                />
                            )
                        })
                        }
                    </div>

                    <p className="text text_type_main-medium mb-6" ref={souseRef}>
                        ??????????
                    </p>
                    <div className={burgerIngredientsStyle.cards}>
                        {ingridnentsFilter("sauce").map((item) => {
                            return (
                                <BurgerIngredientsCard 
                                    key={item._id}  
                                    item={item} 
                                />
                            )
                        })
                        }
                    </div>

                    <p className="text text_type_main-medium mb-6" ref={fillingRef}>
                        ??????????????
                    </p>
                    <div className={burgerIngredientsStyle.cards}>
                        {ingridnentsFilter("main").map((item) => {
                            return (
                                <BurgerIngredientsCard 
                                    key={item._id}  
                                    item={item} 
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

export default memo(BurgerIngredients);

