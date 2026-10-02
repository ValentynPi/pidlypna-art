import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

export function AdminLoginPage() {
  const { token, login } = useAdminAuth();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to="/admin" replace />;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(value);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg rounded-xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="font-serif text-3xl text-ink">Sign in</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        Use a GitHub personal access token with access to{' '}
        <strong className="font-normal text-ink">ValentynPi/pidlypna-art</strong> (Contents:
        read &amp; write). The token stays in this browser tab only.
      </p>
      <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-ink-soft">
        <li>
          GitHub → Settings → Developer settings →{' '}
          <a
            href="https://github.com/settings/tokens"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terracotta underline"
          >
            Fine-grained tokens
          </a>
        </li>
        <li>Repository access: only <em>pidlypna-art</em></li>
        <li>Permissions: Contents → Read and write</li>
      </ol>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block text-xs tracking-widest text-ink-soft uppercase">
          GitHub token
          <input
            type="password"
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-2 w-full rounded border border-ink/15 px-3 py-2.5 font-mono text-sm"
            placeholder="github_pat_…"
            required
          />
        </label>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-ink px-4 py-3 text-sm tracking-wide text-cream uppercase disabled:opacity-60"
        >
          {loading ? 'Checking…' : 'Continue'}
        </button>
      </form>
    </div>
  );
}
