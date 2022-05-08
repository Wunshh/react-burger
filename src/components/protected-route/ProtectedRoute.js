import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }){
  const isLoggin = useSelector(store => store.userDataReducer.userIsLoggin);
  const loginSuccess = useSelector(store => store.loginFormReducer.loginSuccess);

  return (
    <Route>
      { 
        () => (isLoggin || loginSuccess ? 
          <Component {...props} /> 
        :  
          <Redirect to={{ pathname: "/login", state: { from: props.location}}} />
        )
      }
    </Route>
  )
};

export default ProtectedRoute;