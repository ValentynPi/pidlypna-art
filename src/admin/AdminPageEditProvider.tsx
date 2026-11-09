import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAdminAuth } from './AdminAuthContext';
import { PageEditSheet } from './PageEditSheet';
import type { EditablePageId } from './pageEditorUtils';

export function editablePageFromPath(pathname: string): EditablePageId | null {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === '/') return 'home';
  if (path === '/about') return 'about';
  if (path === '/charity') return 'charity';
  if (path === '/encounters') return 'encounters';
  return null;
}

interface AdminPageEditContextValue {
  page: EditablePageId | null;
  openPageEditor: () => void;
}

const AdminPageEditContext = createContext<AdminPageEditContextValue | null>(null);

export function useAdminPageEdit() {
  return useContext(AdminPageEditContext);
}

export function AdminPageEditProvider({ children }: { children: ReactNode }) {
  const { token } = useAdminAuth();
  const location = useLocation();
  const page = editablePageFromPath(location.pathname);
  const [open, setOpen] = useState(false);

  const openPageEditor = useCallback(() => {
    if (page) setOpen(true);
  }, [page]);

  const value = useMemo(
    () => ({ page, openPageEditor }),
    [page, openPageEditor],
  );

  return (
    <AdminPageEditContext.Provider value={value}>
      {children}
      {token && page ? (
        <>
          <div className="pointer-events-none fixed inset-x-0 top-[max(5.5rem,env(safe-area-inset-top))] z-[88] flex justify-end px-3 sm:top-24 sm:px-5">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="pointer-events-auto rounded-full border border-terracotta/50 bg-terracotta px-5 py-3 text-[0.7rem] font-semibold tracking-[0.2em] text-white uppercase shadow-lg shadow-ink/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Edit this page
            </button>
          </div>
          <AnimatePresence>
            {open ? <PageEditSheet page={page} onClose={() => setOpen(false)} /> : null}
          </AnimatePresence>
        </>
      ) : null}
    </AdminPageEditContext.Provider>
  );
}
