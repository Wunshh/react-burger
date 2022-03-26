import { useEffect, useState } from 'react';

import * as api from '../../utils/api';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetail from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import appStyles from './app.module.css';


function App() {

  const [ingredients, setIngredients] = useState([]);
  const [isIngredientModalShown, setIsIngredientModalShown] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isOrderModalShown, setIsOrderModalShown] = useState(false);

  useEffect(() => {
    api.getIngredientsData()
    .then((res) => {
      setIngredients(res.data);      
    })
  }, []);

  function handleIngredientClick(ingredient) {
    setSelectedIngredient(ingredient);
    setIsIngredientModalShown(true);
  }

  function handleModalClose() {
    setSelectedIngredient(null)
    setIsIngredientModalShown(false);
    setIsOrderModalShown(false);
  }

  function handleModalCloseKeyDown(evt) {
    if (evt.key === 'Escape') {
      handleModalClose();
    }
  }

  function handleOrderClick() {
    setIsOrderModalShown(true);
  }

  return (
    <div className={appStyles.app}>
      <AppHeader />

      <main className={appStyles.main}>
        <BurgerIngredients data={ingredients} onCardClick={handleIngredientClick}/>
        <BurgerConstructor onButtonClick={handleOrderClick}/>
      </main>
      
      {isIngredientModalShown && <IngredientDetail 
        visible={isIngredientModalShown} 
        item={selectedIngredient} 
        onClose={handleModalClose}
        onKeyDown={handleModalCloseKeyDown}
      />}

      {isOrderModalShown && <OrderDetails 
        visible={isOrderModalShown}
        onKeyDown={handleModalCloseKeyDown}
        onClose={handleModalClose}
      />}
    </div>
  );
}

export default App;
