import { FC } from 'react';
import { useSelector } from '../../utils/hooks';
import { Route, Redirect } from 'react-router-dom';

interface IProtected {
  component: any;
  location?: string;
  path: string;
};

const ProtectedRoute: FC<IProtected> = ({ component: Component, ...props }) => {
  const isLoggin = useSelector(store => store.userDataReducer.userIsLoggin);
  const loginSuccess = useSelector((store: any) => store.loginFormReducer.loginSuccess);

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