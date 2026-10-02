import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { SiteContent } from '../data/siteContentTypes';
import { useAdminAuth } from './AdminAuthContext';
import { fetchRemoteSiteContent, publishSiteContent } from './github';
import {
  buildInitialSiteContent,
  mergeEditorContent,
  parseSiteContentJson,
  serializeSiteContent,
} from './siteContentState';

interface AdminSiteContentContextValue {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  remoteSha: string | undefined;
  loading: boolean;
  saving: boolean;
  dirty: boolean;
  setDirty: (dirty: boolean) => void;
  reload: () => Promise<void>;
  publish: () => Promise<void>;
  lastSavedAt: Date | null;
  error: string | null;
}

const AdminSiteContentContext = createContext<AdminSiteContentContextValue | null>(null);

export function AdminSiteContentProvider({ children }: { children: ReactNode }) {
  const { token } = useAdminAuth();
  const [content, setContent] = useState<SiteContent>(() => buildInitialSiteContent());
  const [remoteSha, setRemoteSha] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!token) {
      setContent(buildInitialSiteContent());
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const remote = await fetchRemoteSiteContent(token);
      const parsed = parseSiteContentJson(remote.json);
      setContent(mergeEditorContent(parsed));
      setRemoteSha(remote.sha);
      setDirty(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load content.');
      setContent(buildInitialSiteContent());
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const publish = useCallback(async () => {
    if (!token) throw new Error('Not signed in.');
    setSaving(true);
    setError(null);
    try {
      const json = serializeSiteContent(content);
      await publishSiteContent(json, token, remoteSha);
      setLastSavedAt(new Date());
      setDirty(false);
      const remote = await fetchRemoteSiteContent(token);
      setRemoteSha(remote.sha);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Publish failed.';
      setError(message);
      throw err;
    } finally {
      setSaving(false);
    }
  }, [token, content, remoteSha]);

  const value = useMemo(
    () => ({
      content,
      setContent,
      remoteSha,
      loading,
      saving,
      dirty,
      setDirty,
      reload,
      publish,
      lastSavedAt,
      error,
    }),
    [
      content,
      remoteSha,
      loading,
      saving,
      dirty,
      reload,
      publish,
      lastSavedAt,
      error,
    ],
  );

  return (
    <AdminSiteContentContext.Provider value={value}>{children}</AdminSiteContentContext.Provider>
  );
}

export function useAdminSiteContent() {
  const ctx = useContext(AdminSiteContentContext);
  if (!ctx) throw new Error('useAdminSiteContent must be used within AdminSiteContentProvider');
  return ctx;
}
