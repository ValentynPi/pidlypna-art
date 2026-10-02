import { useState } from 'react';
import { RouterLink } from '../components/ui/RouterLink';
import { useAdminAuth } from './AdminAuthContext';
import { useAdminSiteContent } from './AdminSiteContentContext';

export function AdminEditBar() {
  const { token, username, logout } = useAdminAuth();
  const { dirty, saving, publish, lastSavedAt } = useAdminSiteContent();
  const [status, setStatus] = useState('');

  if (!token) return null;

  async function onPublish() {
    setStatus('');
    try {
      await publish();
      setStatus('Published — the live site updates in a few minutes.');
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Could not publish.');
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[85] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-3 rounded-xl border border-ink/10 bg-cream/95 px-4 py-3 shadow-lg backdrop-blur-md">
        <div className="min-w-0 text-sm">
          <p className="font-serif text-ink">Editing mode</p>
          <p className="truncate text-xs text-ink-soft">
            {username ? `@${username}` : 'Signed in'}
            {dirty ? ' · unsaved changes' : lastSavedAt ? ' · saved' : ''}
          </p>
          {status && <p className="mt-1 text-xs text-terracotta">{status}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RouterLink
            to="/gallery"
            className="rounded border border-ink/15 px-3 py-2 text-[0.65rem] tracking-widest text-ink uppercase"
          >
            Gallery
          </RouterLink>
          <button
            type="button"
            disabled={!dirty || saving}
            onClick={() => void onPublish()}
            className="rounded bg-terracotta px-4 py-2 text-[0.65rem] font-semibold tracking-widest text-white uppercase disabled:opacity-45"
          >
            {saving ? 'Publishing…' : 'Publish'}
          </button>
          <button
            type="button"
            onClick={logout}
            className="rounded border border-ink/15 px-3 py-2 text-[0.65rem] tracking-widest text-ink-soft uppercase"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
