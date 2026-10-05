import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import { setSiteContentOverride } from '../data/siteContent';
import type { SiteContent } from '../data/siteContentTypes';
import { useAdminAuth } from './AdminAuthContext';
import { fetchRemoteSiteContent, publishSiteContent } from './github';
import {
  buildInitialSiteContent,
  mergeEditorContent,
  parseSiteContentJson,
  prepareSiteContentForPublish,
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
  publish: (override?: SiteContent) => Promise<void>;
  getContentSnapshot: () => SiteContent;
  lastSavedAt: Date | null;
  error: string | null;
}

const AdminSiteContentContext = createContext<AdminSiteContentContextValue | null>(null);

export function AdminSiteContentProvider({ children }: { children: ReactNode }) {
  const { token } = useAdminAuth();
  const [content, setContentState] = useState<SiteContent>(() => buildInitialSiteContent());
  const contentRef = useRef(content);
  contentRef.current = content;

  const setContent = useCallback((action: SetStateAction<SiteContent>) => {
    setContentState((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      contentRef.current = next;
      return next;
    });
  }, []) as Dispatch<SetStateAction<SiteContent>>;

  const getContentSnapshot = useCallback(() => contentRef.current, []);
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

  useEffect(() => {
    if (!token) {
      setSiteContentOverride(null);
      return;
    }
    setSiteContentOverride(content);
    return () => setSiteContentOverride(null);
  }, [token, content]);

  const publish = useCallback(
    async (override?: SiteContent) => {
      if (!token) throw new Error('Not signed in.');
      setSaving(true);
      setError(null);
      try {
        const payload = prepareSiteContentForPublish(override ?? contentRef.current);
        setContent(payload);
        const json = serializeSiteContent(payload);
        const newSha = await publishSiteContent(json, token, remoteSha);
        setLastSavedAt(new Date());
        setDirty(false);
        setRemoteSha(newSha || undefined);
        const remote = await fetchRemoteSiteContent(token);
        setContent(mergeEditorContent(parseSiteContentJson(remote.json)));
        setRemoteSha(remote.sha);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Publish failed.';
        setError(message);
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [token, remoteSha, setContent],
  );

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
      getContentSnapshot,
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
      getContentSnapshot,
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
