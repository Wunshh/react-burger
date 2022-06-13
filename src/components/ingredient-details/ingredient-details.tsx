import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';
import { useParams } from 'react-router-dom';

import { getIngredientsData } from '../../services/actions/ingredients'; 
import { TIngredients } from '../../utils/types';

import ingredientDetailsStyle from './ingredient-details.module.css';

function IngredientDetail() {

    const ingredientId: {ingredientId: string} = useParams();  
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredientsData());
    }, [dispatch]);

    const modalItem = useSelector(state=> state.ingredient.ingredient);
    const ingredients = useSelector(store => store.ingredient.allIngredients);
   
    const ingredient = (ingredients.filter((item: TIngredients) => item._id === ingredientId.ingredientId))[0];

    const item = ingredient || modalItem;

    return (
        item !== null ? 
        <div className={ingredientDetailsStyle.card}>
            <img                 
                alt="изображение ингридиента"
                src={item.image_large}
            />
            <p className="text text_type_main-medium mt-1 mb-2 text-align">
                {item.name}
            </p>
            <div className={ingredientDetailsStyle.nutritions}>
                <div className={ingredientDetailsStyle.nutrition}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.calories}</p>
                </div>

                <div className={ingredientDetailsStyle.nutrition}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.proteins}</p>
                </div>

                <div className={ingredientDetailsStyle.nutrition}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.fat}</p>
                </div>
                
                <div className={ingredientDetailsStyle.nutrition}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.carbohydrates}</p>
                </div>
            </div>
        </div> 
        :
        null
    );
}


export default IngredientDetail;
