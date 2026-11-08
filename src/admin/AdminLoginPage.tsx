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
      <PageMeta
        title="Edit site"
        description="Sign in to edit gallery content."
        noindex
      />
      <PageHeader
        label="Studio"
        title="Edit the site"
        description="Sign in once, then browse the gallery as usual — reorder works, change titles in three languages, and upload photos. Publish when you are ready."
        backTo="/"
        backLabel="Home"
      />
      <section className="mx-auto max-w-xl px-5 pb-24 md:px-10 lg:px-16">
        <div className="space-y-3 text-sm leading-relaxed text-ink-soft">
          <p>
            Sign in with a personal access token for repo{' '}
            <strong className="font-normal text-ink">ValentynPi/pidlypna-art</strong> (branch{' '}
            <strong className="font-normal text-ink">main</strong>).
          </p>
          <p className="text-[0.8rem]">
            <strong className="font-normal text-ink">Fine-grained token</strong> (recommended):
          </p>
          <ol className="list-decimal space-y-1 pl-5 text-[0.8rem]">
            <li>Resource owner: your GitHub user (owner of the repo).</li>
            <li>Repository access: Only <strong className="font-normal text-ink">pidlypna-art</strong>.</li>
            <li>Repository permissions: <strong className="font-normal text-ink">Contents → Read and write</strong>.</li>
            <li>Account permissions: <strong className="font-normal text-ink">Profile → Read-only</strong> (needed for sign-in).</li>
          </ol>
          <p className="text-[0.8rem]">
            Or a <strong className="font-normal text-ink">classic token</strong> with scope{' '}
            <strong className="font-normal text-ink">repo</strong>.
          </p>
          <a
            href="https://github.com/settings/personal-access-tokens/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-terracotta underline"
          >
            Create fine-grained token
          </a>
          {' · '}
          <a
            href="https://github.com/settings/tokens/new?scopes=repo&description=pidlypna-art%20admin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terracotta underline"
          >
            Create classic token
          </a>
        </div>
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
