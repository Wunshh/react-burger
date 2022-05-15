import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
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
import IngredientPage from '../../pages/ingredient-page';
import NotFound404 from '../../pages/not-found';
import ProtectedRoute from '../protected-route/ProtectedRoute';
import { MODAL_CLOSE } from '../../services/actions/modal';
import { getUserData } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie';
import { TLocation } from '../../utils/types';

import appStyles from './app.module.css';


function App() {

  const [isIngredientModalShown, setIsIngredientModalShown] = useState<boolean>(false);
  const [isOrderModalShown, setIsOrderModalShown] = useState<boolean>(false);
  const dispatch = useDispatch();

  const location: TLocation = useLocation();
  
  const history = useHistory();
  const background = location.state && location.state.background;

  function handleIngredientClick() {
    setIsIngredientModalShown(true);
  }

  function handleModalClose() {
    if (isIngredientModalShown) {
      setIsIngredientModalShown(false);
      history.goBack();
    }
    if (isOrderModalShown) {
      setIsOrderModalShown(false);
      dispatch({
        type: MODAL_CLOSE
      })
    }
    if (location.pathname.indexOf('ingredients') === 1) {
      history.goBack();
    }
  }

  function handleOrderClick() {
    setIsOrderModalShown(true);
  }

  useEffect(() => {
    if (getCookie('accessToken')) {
      dispatch(getUserData());
    }
  }, [dispatch]);

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
              
          {isOrderModalShown && 
            <Modal
              onClose={handleModalClose}
            >
              <OrderDetails />
            </Modal>
          }
        </Route>

        <Route
          exact
          path='/ingredients/:ingredientId'
          component={IngredientPage}
        />

        <Route
          exact 
          path="/login"
          component={LoginPage}
        />

        <Route 
          exact 
          path="/register"
          component={RegistrationPage}
        />
       
        <Route 
          exact 
          path="/forgot-password"
          component={ForgotPasswordPage}
        />

        <Route 
          exact 
          path="/reset-password"
          component={ResetPage}
        />
        
        <ProtectedRoute
          path="/profile"
          component={ProfilePage}
        />

        <ProtectedRoute
          path="/profile/orders"
          component={ProfilePage}
        />
        <Route>
          <NotFound404 />
        </Route>

      </Switch>

      {background && (
          <Route
            path='/ingredients/:ingredientId'
            children={
              <Modal 
                header="Детали ингридиента"
                onClose={handleModalClose}
              >
                <IngredientDetail />
              </Modal>
            }
          />
      )}

    </div> 
  );
}

export default App;