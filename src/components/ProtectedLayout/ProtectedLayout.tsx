import { useAuth } from 'hooks';
import { Navigate, useOutlet } from 'react-router-dom';
import styles from './protectedLayout.module.css';

export function ProtectedLayout() {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <div className={styles.protectLayout}>{outlet}</div>;
}
