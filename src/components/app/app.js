import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import * as api from '../../utils/api';
import IngredientDetail from '../ingredient-details/ingredient-details';

function App() {

  const [ingredients, setIngredients] = useState([]);
  const [isIngredientModal, setIsIngredientModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState({});

  useEffect(() => {
    api.getIngredientsData()
    .then((res) => {
      setIngredients(res.data);      
    })
  }, []);

  function handleIngredientClick(ingredient) {
    setSelectedIngredient(ingredient);
    setIsIngredientModal(true);
  }

  function handleModalClose() {
    setSelectedIngredient({})
    setIsIngredientModal(false);
  }

  function handleModalCloseKeyDown(evt) {
    if (evt.key === 'Escape') {
      setSelectedIngredient({})
      setIsIngredientModal(false);
    }
  }


  return (
    <div className={appStyles.app}>
      <AppHeader />

      <main className={appStyles.main}>
        <BurgerIngredients data={ingredients} onCardClick={handleIngredientClick}/>
        <BurgerConstructor />
      </main>
      
      <IngredientDetail 
        visible={isIngredientModal} 
        item={selectedIngredient} 
        onClose={handleModalClose}
        onKeyDown={handleModalCloseKeyDown}
      />
    </div>
  );
}

export default App;
