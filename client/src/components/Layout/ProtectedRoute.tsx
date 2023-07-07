import { Navigate, useLocation } from 'react-router-dom';
import { FC } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
  }

const PrivateRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  return token ? children
   : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
