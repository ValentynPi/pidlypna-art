import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

export function AdminRedirect() {
  const { token } = useAdminAuth();
  return <Navigate to={token ? '/gallery' : '/admin/login'} replace />;
}
