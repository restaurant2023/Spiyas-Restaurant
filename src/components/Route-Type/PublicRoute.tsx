import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

type PublicRouteProps = {
  children: ReactNode;
  redirectTo?: string;
};

const PublicRoute = ({ children, redirectTo = '/' }: PublicRouteProps) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
export default PublicRoute;
