import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import * as api from '../../utils/api';
import IngredientDetail from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

function App() {

  const [ingredients, setIngredients] = useState([]);
  const [isIngredientModal, setIsIngredientModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [isOrderModal, setIsOrderModal] = useState(false);

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
    setIsOrderModal(false);
  }

  function handleModalCloseKeyDown(evt) {
    if (evt.key === 'Escape') {
      setSelectedIngredient({})
      setIsIngredientModal(false);
      setIsOrderModal(false);
    }
  }

  function handleOrderClick() {
    setIsOrderModal(true);
  }

  return (
    <div className={appStyles.app}>
      <AppHeader />

      <main className={appStyles.main}>
        <BurgerIngredients data={ingredients} onCardClick={handleIngredientClick}/>
        <BurgerConstructor onButtonClick={handleOrderClick}/>
      </main>
      
      {isIngredientModal && <IngredientDetail 
        visible={isIngredientModal} 
        item={selectedIngredient} 
        onClose={handleModalClose}
        onKeyDown={handleModalCloseKeyDown}
      />}

      {isOrderModal && <OrderDetails 
        visible={isOrderModal}
        onKeyDown={handleModalCloseKeyDown}
        onClose={handleModalClose}
      />}
    </div>
  );
}

export default App;
