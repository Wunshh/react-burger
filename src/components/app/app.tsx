import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import AppHeader from '../app-header/app-header';
import Preloader from '../preloader/preloader';
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
import FeedPage from '../../pages/feed';
import ProtectedRoute from '../protected-route/ProtectedRoute';
import OrderIngreients from '../order-ingreients/order-ingreients';
import OrderIngreientsPage from '../../pages/order-ingredient-page';
import { MODAL_CLOSE } from '../../services/actions/modal';
import { getUserData } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie';
import { TLocation } from '../../utils/types';


import appStyles from './app.module.css';


function App() {

  const dispatch = useDispatch();
  const location: TLocation = useLocation();

  const history = useHistory();
  const background = location.state && location.state.background;
  const orderDetails = useSelector((store) => store.ingredient.order);
   

  function handleOrderModalClose() {
    dispatch({
      type: MODAL_CLOSE
    });
  }

  function handleModalClose() {
    dispatch({
      type: MODAL_CLOSE
    });
    history.goBack();
  }

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className={appStyles.app}>

      <AppHeader />

      <Switch location={background || location}>

        <Route exact path='/'>
          <main className={appStyles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              
              <BurgerConstructor />
            </DndProvider>
          </main>
              
          {orderDetails && 
            <Modal
              onClose={handleOrderModalClose}
            >
              <OrderDetails />
            </Modal>
          } 
          <div className={appStyles.preloader}>
            <Preloader/>
          </div>
        </Route>

        <Route
          exact
          path='/ingredients/:ingredientId'
          component={IngredientPage}
        />

        <Route
          exact
          path='/feed/:orderNumber'
          component={OrderIngreientsPage}
        />

        <Route
          exact
          path='/profile/orders/:orderNumber'
          component={OrderIngreientsPage}
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

        <Route
          exact
          path="/feed"
        >
          <FeedPage />
        </Route>  
        
        
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute> 

        <ProtectedRoute path="/profile/orders">
          <ProfilePage />
        </ProtectedRoute> 

        
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

      {background && (
        <Route
          path='/feed/:orderNumber'
          children={
            <Modal 
              onClose={handleModalClose}
            >
              <OrderIngreients />
            </Modal>
          }
        />
      )}

      {background && (
        <Route
          path='/profile/orders/:orderNumber'
          children={
            <Modal 
              onClose={handleModalClose}
            >
              <OrderIngreients />
            </Modal>
          }
        />
      )}
    </div> 
  );
}

export default App;