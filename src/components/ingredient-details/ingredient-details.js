import {dataPropTypes} from '../../utils/types';
import Modal from '../modal/modal';

import ingredientDetailsStyle from './ingredient-details.module.css';

function IngredientDetail({visible, item, onClose, onKeyDown}) {
    return (
        item && 
        <Modal header="Детали ингридиента" 
            visible={visible} 
            onClose={onClose}
            onKeyDown={onKeyDown}
        >
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
        </Modal>
    );
}

IngredientDetail.propTypes = {
    item: dataPropTypes
}

export default IngredientDetail;
