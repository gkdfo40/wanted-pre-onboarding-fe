import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';

export function HomeLayout() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/protected/todos" replace={true} />;
  }
  return <Outlet />;
}
