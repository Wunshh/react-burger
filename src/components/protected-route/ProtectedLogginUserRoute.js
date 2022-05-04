import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { getUserData } from '../../services/actions/user';


function ProtectedLogginUserRoute({ component: Component, ...props }){
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
            <Redirect to={{ pathname: '/' , state: { from: location } }} />
          :
            <Component {...props} /> 
        )
      }
    </Route>
  )
};

export default ProtectedLogginUserRoute;