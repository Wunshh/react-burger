import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../utils/cookie';

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    {
      () => (getCookie('accessToken') ? <Component {...props} /> : <Redirect to='/login' />)
    }
  </Route>
);

export default ProtectedRoute;