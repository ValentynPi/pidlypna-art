import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { verifyGitHubToken } from './github';

const STORAGE_KEY = 'viktoria-admin-github-token';

interface AdminAuthContextValue {
  token: string | null;
  username: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(STORAGE_KEY));
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    verifyGitHubToken(token)
      .then((user) => setUsername(user.login))
      .catch(() => {
        sessionStorage.removeItem(STORAGE_KEY);
        setToken(null);
      });
  }, [token]);

  const login = useCallback(async (nextToken: string) => {
    const trimmed = nextToken.trim();
    const user = await verifyGitHubToken(trimmed);
    sessionStorage.setItem(STORAGE_KEY, trimmed);
    setToken(trimmed);
    setUsername(user.login);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUsername(null);
  }, []);

  const value = useMemo(
    () => ({ token, username, login, logout }),
    [token, username, login, logout],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
