
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetail from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import LoginPage from '../../pages/login';
import RegistrationPage from '../../pages/registration';
import ForgotPasswordPage from '../../pages/forgot';
import ResetPage from '../../pages/reset';
import ProfilePage from '../../pages/profile';
import NotFound404 from '../../pages/not-found';
import ProtectedRoute from '../ProtectedRoute';

import appStyles from './app.module.css';


function App() {

  const [isIngredientModalShown, setIsIngredientModalShown] = useState(false);
  const [isOrderModalShown, setIsOrderModalShown] = useState(false);

  const location = useLocation();
  const history = useHistory();
  let background = location.state && location.state.background;

  function handleIngredientClick() {
    setIsIngredientModalShown(true);
  }

  function handleModalClose() {
    setIsIngredientModalShown(false);
    setIsOrderModalShown(false);
    history.goBack();
  }

  function handleOrderClick() {
    setIsOrderModalShown(true);
  }

  return (
    <div className={appStyles.app}>

      <AppHeader />

      <Switch location={background || location}>

        <Route exact path='/'>
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
        </Route>

        <Route exact path="/login">
          <LoginPage />
        </Route>

        <Route exact path="/register">
          <RegistrationPage /> 
        </Route>

        <Route exact path="/forgot-password">
          <ForgotPasswordPage />
        </Route>

        <Route exact path="/reset-password">
          <ResetPage />
        </Route>

        <ProtectedRoute
          path="/profile"
          component={ProfilePage}
        />
        
        <ProtectedRoute
          path="/profile/orders"
          component={ProfilePage}
        />
        <Route path="*">
          <NotFound404 />
        </Route>

      </Switch>
    </div> 
  );
}

export default App;