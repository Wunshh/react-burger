import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function ProtectedLogginUserRoute({ component: Component, ...props }){
  const isLoggin = useSelector(store => store.userDataReducer.userIsLoggin);
  const loginSuccess = useSelector(store => store.loginFormReducer.loginSuccess);
  const location = props.location.state === null || props.location.state === undefined  ? '/' : props.location.state.from;

  return (
    <Route>
      {
        () => (isLoggin || loginSuccess ? 
            <Redirect to={{ pathname: location }} />
          :
            <Component {...props} /> 
        )
      }
    </Route>
  )
};

export default ProtectedLogginUserRoute;