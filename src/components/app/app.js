
import { Route, Switch } from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/login';
import RegistrationPage from '../../pages/registration';
import ForgotPasswordPage from '../../pages/forgot';
import ResetPage from '../../pages/reset';
import ProfilePage from '../../pages/profile';
import NotFound404 from '../../pages/not-found';

import appStyles from './app.module.css';



function App() {

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <Switch>
        <Route exact path="/">
          <HomePage />
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

        <Route exact path="/profile">
          <ProfilePage />
        </Route>

        <Route path="*">
          <NotFound404 />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
