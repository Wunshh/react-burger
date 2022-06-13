import IngredientDetail from '../components/ingredient-details/ingredient-details';
import ingredientPageStyle from './ingredient-page.module.css';

function IngredientPage() {
    return (
        <div className={ingredientPageStyle.container}>
            <h2 className="text text_type_main-large">
                Детали ингридиента
            </h2>
            <IngredientDetail />
       </div>
    )
}

export default IngredientPage;