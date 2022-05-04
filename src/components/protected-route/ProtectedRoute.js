import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { getUserData } from '../../services/actions/user';

function ProtectedRoute({ component: Component, ...props }){
  const location = useLocation();
  const isLoggin = useSelector(store => store.userDataReducer.userIsLoggin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <Route>
      {
        () => (isLoggin ? 
          <Component {...props} /> 
        :  
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    </Route>
  )
};

export default ProtectedRoute;