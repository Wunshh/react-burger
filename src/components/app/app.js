import { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetail from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

import appStyles from './app.module.css';


function App() {

  const [isIngredientModalShown, setIsIngredientModalShown] = useState(false);
  const [isOrderModalShown, setIsOrderModalShown] = useState(false);

  function handleIngredientClick() {
    setIsIngredientModalShown(true);
  }

  function handleModalClose() {
    setIsIngredientModalShown(false);
    setIsOrderModalShown(false);
  }

  function handleOrderClick() {
    setIsOrderModalShown(true);
  }

  return (
    <div className={appStyles.app}>
      <AppHeader />

      <main className={appStyles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients 
            onCardClick={handleIngredientClick} 
          />
          
          <BurgerConstructor 
            onButtonClick={handleOrderClick} 
          />
        </DndProvider>
      </main>
           
      {isIngredientModalShown && 
        <Modal 
          header="Детали ингридиента"
          onClose={handleModalClose}
        >
          <IngredientDetail />
        </Modal>
      }

      {isOrderModalShown && 
        <Modal
          onClose={handleModalClose}
        >
          <OrderDetails />
        </Modal>
      }
    </div>
  );
}

export default App;
