import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useStore } from '../store';

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const currentUser = useStore((state) => state.currentUser);
  const location = useLocation();

  if (!currentUser)
    return <Navigate to={`/sign-in?redirect=${encodeURIComponent(location.pathname + location.search)}`} />;

  return <>{children}</>;
};

export default PrivateRoute;
