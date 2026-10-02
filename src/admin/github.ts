import { SITE_CONTENT_PATH } from '../data/siteContentTypes';

export const GITHUB_REPO = 'ValentynPi/pidlypna-art';
export const GITHUB_BRANCH = 'main';

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

export async function verifyGitHubToken(token: string): Promise<{ login: string }> {
  const res = await fetch('https://api.github.com/user', { headers: authHeaders(token) });
  if (!res.ok) {
    throw new Error('Invalid token or insufficient permissions.');
  }
  const data = (await res.json()) as { login: string };
  return { login: data.login };
}

interface GitHubFile {
  content: string;
  sha: string;
}

export async function readRepoFile(path: string, token: string): Promise<GitHubFile | null> {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`, {
    headers: authHeaders(token),
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `GitHub read failed (${res.status})`);
  }
  const data = (await res.json()) as { content: string; sha: string };
  const binary = atob(data.content.replace(/\n/g, ''));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  const content = new TextDecoder().decode(bytes);
  return { content, sha: data.sha };
}

export async function writeRepoFile(
  path: string,
  content: string,
  token: string,
  message: string,
  sha?: string,
): Promise<void> {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;
  const body = {
    message,
    content: btoa(unescape(encodeURIComponent(content))),
    branch: GITHUB_BRANCH,
    ...(sha ? { sha } : {}),
  };
  const res = await fetch(url, {
    method: 'PUT',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `GitHub write failed (${res.status})`);
  }
}

export async function uploadRepoImage(
  file: File,
  token: string,
  targetName?: string,
): Promise<string> {
  const safeName =
    targetName ??
    file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  const path = `public/images/${safeName}`;

  const existing = await readRepoFile(path, token);
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]!);
  }
  const base64 = btoa(binary);

  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Upload image ${safeName}`,
      content: base64,
      branch: GITHUB_BRANCH,
      ...(existing?.sha ? { sha: existing.sha } : {}),
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `Image upload failed (${res.status})`);
  }
  return `/images/${safeName}`;
}

export async function fetchRemoteSiteContent(token: string): Promise<{ json: string; sha?: string }> {
  const file = await readRepoFile(SITE_CONTENT_PATH, token);
  if (!file) {
    return { json: '{}' };
  }
  return { json: file.content, sha: file.sha };
}

export async function publishSiteContent(
  json: string,
  token: string,
  sha?: string,
): Promise<void> {
  await writeRepoFile(
    SITE_CONTENT_PATH,
    json,
    token,
    'Update site content from admin',
    sha,
  );
}
