// lib/mdx-docs.ts
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ALLOWED = new Set(['blog', 'nikki', 'fun', 'novel']);
const ROOT = path.join(process.cwd(), 'content');

export async function readMdxBySegments(segments) {
  const s = Array.isArray(segments) ? segments : [];
  // must start with an allowed top-level section
  if (s.length === 0 || !ALLOWED.has(s[0])) return null;

  const rel = s.join('/');
  const tryFile = path.join(ROOT, `${rel}.mdx`);
  const tryIndex = path.join(ROOT, rel, 'index.mdx');

  try {
    return await fs.readFile(tryFile, 'utf8');
  } catch {}
  try {
    return await fs.readFile(tryIndex, 'utf8');
  } catch {}
  return null;
}

export async function listAllMdxSlugs(dir = ROOT, prefix = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];

  for (const e of entries) {
    const name = e.name;

    // Only traverse allowed sections at the top level of /content
    if (prefix.length === 0) {
      if (!e.isDirectory()) continue;
      if (!ALLOWED.has(name)) continue;
      out.push(...(await listAllMdxSlugs(path.join(dir, name), [name])));
      continue;
    }

    if (e.isDirectory()) {
      out.push(...(await listAllMdxSlugs(path.join(dir, name), [...prefix, name])));
    } else if (e.isFile() && e.name.endsWith('.mdx')) {
      if (e.name === 'index.mdx') out.push({ markdownPath: prefix });
      else out.push({ markdownPath: [...prefix, e.name.replace(/\.mdx$/, '')] });
    }
  }
  return out;
}
