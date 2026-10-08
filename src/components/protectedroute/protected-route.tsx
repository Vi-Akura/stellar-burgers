import { useSelector } from 'react-redux';
import { isAuthCheckedSelector, userDataSelector } from '../../services/selectors'
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  auth?: boolean;
  unAuth?: boolean;
  component: React.ReactElement;
};

export const ProtectedRoute = ({ auth, unAuth, component }: ProtectedRouteProps) => {
    const isAuthChecked = useSelector(isAuthCheckedSelector);
    const user = useSelector(userDataSelector);
    const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (auth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (unAuth && user) {
        const from  = location.state?.from || { pathname: '/' };

        return <Navigate replace to={from} />;
  }

    return component ;
}
