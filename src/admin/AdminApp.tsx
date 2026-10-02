import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminAuthProvider } from './AdminAuthContext';
import { AdminSiteContentProvider } from './AdminSiteContentContext';
import { AdminLayout } from './AdminLayout';
import { AdminRequireAuth } from './AdminRequireAuth';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminHomePage } from './AdminHomePage';
import { AdminCollectionPage } from './AdminCollectionPage';
import { Helmet } from 'react-helmet-async';

export function AdminApp() {
  return (
    <AdminAuthProvider>
      <AdminSiteContentProvider>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
          <title>Site admin · Viktoria Paladios</title>
        </Helmet>
        <Routes>
          <Route path="login" element={<AdminLoginPage />} />
          <Route element={<AdminRequireAuth />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminHomePage />} />
              <Route path="collection/:slug" element={<AdminCollectionPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AdminSiteContentProvider>
    </AdminAuthProvider>
  );
}
