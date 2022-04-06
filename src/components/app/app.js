import { useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetail from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import appStyles from './app.module.css';


function App() {
  
  const isOrderModalShown = useSelector(store => store.modal.orderModalOpen);
  const isIngredientModalShown = useSelector(store => store.modal.ingredientModalOpen);

  return (
    <div className={appStyles.app}>
      <AppHeader />

      <main className={appStyles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          
          <BurgerConstructor />
        </DndProvider>
      </main>
           
      {isIngredientModalShown && <IngredientDetail />}

      {isOrderModalShown && <OrderDetails />}
    </div>
  );
}

export default App;
