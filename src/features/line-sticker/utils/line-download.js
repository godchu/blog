// utils.js
import * as cheerio from 'cheerio';

/**
 * Clean a LINE store URL:
 * - Remove [brackets] and enclosed text
 * - Trim and take last whitespace-separated token
 */
export function cleanUrl(raw) {
  const noBrackets = (raw || '').replace(/\[.*?\]/g, '').trim();
  const pieces = noBrackets.split(/\s+/);
  return pieces[pieces.length - 1] || '';
}

/**
 * Fetch helper that works in Node and the browser
 */
async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      // LINE blocks default bots; set a realistic UA
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari',
    },
    cache: 'no-store',
    mode: 'no-cors',
  });

  if (!res.ok) throw new Error(`Failed to fetch store page: ${res.status}`);
  return await res.text();
}

/**
 * Parse a data-preview attribute into an object safely.
 * LINE often HTML-encodes quotes in this attribute.
 */
function parsePreviewAttr(attr) {
  if (!attr) return null;
  // Unescape common encodings
  const unescaped = attr
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
  try {
    return JSON.parse(unescaped);
  } catch {
    return null;
  }
}

/**
 * Normalize one sticker preview record to {id, url, type}
 */
function toStickerInfo(preview) {
  // preview may look like:
  // { id, staticUrl, animationUrl, type: 'STATIC' | 'ANIMATION' | 'SOUND' ... }
  const id = String(preview.id ?? preview.stickerId ?? '').trim();
  const hasAnim = !!preview.animationUrl;
  const url = hasAnim ? preview.animationUrl : preview.staticUrl || preview.url;
  const type = hasAnim ? 'ANIMATED' : 'STATIC';
  if (!id || !url) return null;
  return { id, url, type };
}

/**
 * Build a sticker info from a plain <img> when data-preview is missing.
 * Tries to extract the numeric id from filename or data attributes.
 */
function fromImg($img) {
  const url = $img.attr('data-src') || $img.attr('src') || $img.attr('data-original') || '';

  if (!url) return null;

  // Try to pull an ID from common LINE CDN paths
  // e.g. .../sticker/123456789/android/sticker.png
  const m = url.match(/\/sticker\/(\d+)\//);
  const id = m?.[1] || '';

  if (!id) return null;

  // Heuristic: animation variants often contain "animation" in the path/filename
  const isAnim = /animation/i.test(url);
  return { id, url, type: isAnim ? 'ANIMATED' : 'STATIC' };
}

/**
 * Scrape sticker info from a LINE Store product page
 * @param {string} storeUrl
 * @returns {Promise<Array<{id:string, url:string, type:'STATIC'|'ANIMATED'}>>}
 */
export async function getStickerInfo(storeUrl) {
  const cleaned = cleanUrl(storeUrl);
  if (!cleaned) return [];

  const html = await fetchHtml(cleaned);

  console.log({ cleaned, html });

  const $ = cheerio.load(html);

  const results = [];

  // 1) Primary path: elements with data-preview (most reliable)
  $('[data-preview]').each((_, el) => {
    const preview = parsePreviewAttr($(el).attr('data-preview'));
    const info = preview && toStickerInfo(preview);
    if (info) results.push(info);
  });

  // 2) Fallback: try common img selectors used on the product page
  if (results.length === 0) {
    // Sticker grid images
    $('li img, .mdCMN09Li img, .mdCMN09Image img, .FnStickerList img').each((_, img) => {
      const info = fromImg($(img));
      if (info) results.push(info);
    });
  }

  // Dedupe by id, prefer ANIMATED if both types exist
  const map = new Map();
  for (const item of results) {
    const prev = map.get(item.id);
    if (!prev) {
      map.set(item.id, item);
    } else if (prev.type === 'STATIC' && item.type === 'ANIMATED') {
      map.set(item.id, item);
    }
  }

  return Array.from(map.values());
}

// ==============================================

// /** Fetch URL -> ArrayBuffer (Node 18+ has global fetch) */
// export async function fetchArrayBuffer(url) {
//   const res = await fetch(url, {
//     headers: {
//       'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari',
//     },
//     cache: 'force-cache',
//   });
//   if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
//   return res.arrayBuffer();
// }

// /** If you specifically need a Node Buffer */
// export async function fetchBuffer(url) {
//   const ab = await fetchArrayBuffer(url);

//   return Buffer.from(ab);
// }

// /** Buffer -> ArrayBuffer (handles offset correctly) */
// export function bufferToArrayBuffer(buf) {
//   return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
// }

// // =============================================

/** Fetch URL -> ArrayBuffer (browser + Node 18+) */
export async function fetchArrayBuffer(url) {
  const isBrowser = typeof window !== 'undefined';
  const init = {
    cache: 'force-cache',
    ...(isBrowser ? {} : { headers: { 'user-agent': 'Mozilla/5.0 Chrome Safari' } }),
  };
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.arrayBuffer();
}

/** No-op helper kept for API symmetry */
export async function fetchBuffer(_url) {
  throw new Error('fetchBuffer not available on web. Use fetchArrayBuffer(url) instead.');
}

/** Robust: works for ArrayBuffer / TypedArray / Buffer */
export function toArrayBuffer(buf) {
  if (buf instanceof ArrayBuffer) return buf;
  if (ArrayBuffer.isView(buf)) {
    return buf.buffer.slice(buf.byteOffset, buf.byteLength + buf.byteOffset);
  }
  // Last resort: copy
  const u8 = new Uint8Array(buf);
  return u8.buffer.slice(u8.byteOffset, u8.byteLength + u8.byteOffset);
}
