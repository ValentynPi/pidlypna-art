import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { useAdminAuth } from './AdminAuthContext';

export function AdminLoginPage() {
  const { token, login } = useAdminAuth();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to="/gallery" replace />;

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
    <>
      <PageMeta title="Edit site" description="Sign in to edit gallery content." />
      <PageHeader
        label="Studio"
        title="Edit the site"
        description="Sign in once, then browse the gallery as usual — reorder works, change titles in three languages, and upload photos. Publish when you are ready."
        backTo="/"
        backLabel="Home"
      />
      <section className="mx-auto max-w-xl px-5 pb-24 md:px-10 lg:px-16">
        <p className="text-sm leading-relaxed text-ink-soft">
          Use a GitHub fine-grained token for{' '}
          <strong className="font-normal text-ink">pidlypna-art</strong> with{' '}
          <strong className="font-normal text-ink">Contents: Read and write</strong>.{' '}
          <a
            href="https://github.com/settings/personal-access-tokens"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terracotta underline"
          >
            Create a token
          </a>
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-[0.65rem] tracking-[0.3em] text-ink-soft uppercase">
              GitHub token
            </span>
            <input
              type="password"
              autoComplete="off"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 font-mono text-sm text-ink outline-none focus:border-terracotta"
              placeholder="github_pat_…"
              required
            />
          </label>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="border border-ink/15 bg-white px-6 py-3 text-xs font-semibold tracking-[0.2em] text-ink uppercase disabled:opacity-50"
          >
            {loading ? 'Checking…' : 'Continue to gallery'}
          </button>
        </form>
      </section>
    </>
  );
}
