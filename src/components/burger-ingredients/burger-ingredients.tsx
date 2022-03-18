import { useState } from 'react';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import { data } from '../../utils/data';
import { 
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients() {

    const [current, setCurrent] = useState('one');

    return (
        <section className={burgerIngredientsStyle.section}>
            <div className={burgerIngredientsStyle.menu}> 
                <h1 className="text text_type_main-large mb-5">
                    Соберите бургер
                </h1>
                <div style={{ display: 'flex' }} className="mb-10">
                    <a href="#bun" className={burgerIngredientsStyle.link}>
                        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                            Булки
                        </Tab>
                    </a>
                    <a href="#sauce" className={burgerIngredientsStyle.link}>
                        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                            Соусы
                        </Tab>
                    </a>
                    <a href="#main" className={burgerIngredientsStyle.link}>
                        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                            Начинки
                        </Tab>
                    </a>
                </div>      
                <div className={burgerIngredientsStyle.ingredients}>    
                    <p className="text text_type_main-medium mb-6" id="bun">
                        Булки
                    </p>
                    <div className={burgerIngredientsStyle.cards}>
                        {data.filter(m => m.type === "bun").map((item) => {
                            return (
                                <BurgerIngredientsCard key={item._id}  item={item}/>
                            )
                        })
                        }
                    </div>

                    <p className="text text_type_main-medium mb-6" id="sauce">
                        Соусы
                    </p>
                    <div className={burgerIngredientsStyle.cards}>
                        {data.filter(m => m.type === "sauce").map((item) => {
                            return (
                                <BurgerIngredientsCard key={item._id}  item={item}/>
                            )
                        })
                        }
                    </div>

                    <p className="text text_type_main-medium mb-6" id="main">
                        Начинки
                    </p>
                    <div className={burgerIngredientsStyle.cards}>
                        {data.filter(m => m.type === "main").map((item) => {
                            return (
                                <BurgerIngredientsCard key={item._id}  item={item}/>
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