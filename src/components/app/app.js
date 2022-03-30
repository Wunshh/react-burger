import { useEffect, useState } from 'react';

import * as api from '../../utils/api';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetail from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { BurgerConstructorContext } from '../../contexts/burger-constructor-context';

import appStyles from './app.module.css';


function App() {

  const [ingredients, setIngredients] = useState([]);
  const [isIngredientModalShown, setIsIngredientModalShown] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isOrderModalShown, setIsOrderModalShown] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null)

  useEffect(() => {
    api.getIngredientsData()
    .then((res) => {
      setIngredients(res.data);      
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  function createOrder(itemsId) {
    api.sendOrder(itemsId) 
    .then((res) => {
      setOrderDetails(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleIngredientClick(ingredient) {
    setSelectedIngredient(ingredient);
    setIsIngredientModalShown(true);
  }

  function handleModalClose() {
    setSelectedIngredient(null)
    setIsIngredientModalShown(false);
    setIsOrderModalShown(false);
    setOrderDetails(null);
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
        <BurgerConstructorContext.Provider value={ingredients}>
          <BurgerIngredients 
            onCardClick={handleIngredientClick} 
          />
          
          <BurgerConstructor 
            onButtonClick={handleOrderClick} 
            createOrder={createOrder}
          />
        </BurgerConstructorContext.Provider>
      </main>
           
      {isIngredientModalShown && <IngredientDetail 
        visible={isIngredientModalShown} 
        item={selectedIngredient} 
        onClose={handleModalClose}
        onKeyDown={handleModalCloseKeyDown}
      />}

      {isOrderModalShown && orderDetails && <OrderDetails 
        visible={isOrderModalShown}
        onKeyDown={handleModalCloseKeyDown}
        onClose={handleModalClose}
        orderDetails={orderDetails}
      />}
    </div>
  );
}

export default App;
