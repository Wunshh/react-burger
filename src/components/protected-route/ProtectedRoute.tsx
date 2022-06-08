import { FC, ReactElement } from 'react';
import { useSelector } from '../../utils/hooks';
import { Redirect } from 'react-router-dom';

interface IProtected {
  location?: string;
  path: string;
  children: ReactElement;
};

const ProtectedRoute: FC<IProtected> = ({ children, ...props }) => {
  const isLoggin = useSelector(store => store.userDataReducer.userIsLoggin);
  const loginSuccess = useSelector((store) => store.loginFormReducer.loginSuccess);

  if (isLoggin || loginSuccess) {
    return children
  } else {
    return <Redirect to={{ pathname: "/login", state: { from: props.location}}} />
  }
};

export default ProtectedRoute;