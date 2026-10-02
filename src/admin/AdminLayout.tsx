import { Link, Outlet } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

export function AdminLayout() {
  const { username, logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-[#f4f1eb] text-ink">
      <header className="border-b border-ink/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <Link to="/admin" className="font-serif text-xl text-ink">
              Site admin
            </Link>
            <p className="text-xs text-ink-soft">Gallery · titles · photos · order</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            {username && <span className="hidden text-ink-soft sm:inline">@{username}</span>}
            <Link to="/" className="text-terracotta hover:underline">
              View site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded border border-ink/15 px-3 py-1.5 text-xs tracking-wide uppercase"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
