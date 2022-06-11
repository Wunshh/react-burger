import { FC } from 'react';
import { useSelector } from '../../utils/hooks';
import { Route, Redirect, RouteProps  } from 'react-router-dom';

const ProtectedRoute: FC<RouteProps> = ({ children, ...props }) => {
  const isLoggin = useSelector(store => store.loginFormReducer.userIsLoggin);
  const loginSuccess = useSelector((store) => store.loginFormReducer.loginSuccess);

  return (
    <Route
        {...props}
        render={({ location }) => (
          isLoggin || loginSuccess ? 
            children
          : 
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )}
    />
);
};

export default ProtectedRoute;