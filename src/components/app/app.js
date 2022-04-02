import { useSelector } from 'react-redux';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetail from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import appStyles from './app.module.css';


function App() {
  
  const isOrderModalShown = useSelector(store => store.burger.orderModalOpen);
  const isIngredientModalShown = useSelector(store => store.burger.ingredientModalOpen);

  return (
    <div className={appStyles.app}>
      <AppHeader />

      <main className={appStyles.main}>
        <BurgerIngredients />
        
        <BurgerConstructor />
      </main>
           
      {isIngredientModalShown && <IngredientDetail />}

      {isOrderModalShown && <OrderDetails />}
    </div>
  );
}

export default App;
