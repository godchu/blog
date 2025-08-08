// utils.js
import * as cheerio from 'cheerio';
import * as UPNG from 'upng-js';

/**
 * Clean a LINE store URL:
 * - Remove [brackets] and enclosed text
 * - Trim and take last whitespace-separated token
 */
export function cleanUrl(raw) {
  const noBrackets = raw.replace(/\[.*?\]/g, '').trim();
  const pieces = noBrackets.split(/\s+/);
  return pieces[pieces.length - 1] || '';
}

/**
 * Scrape sticker info from a LINE Store product page
 * @param {string} storeUrl
 * @returns {Promise<Array<{id:string, url:string, type:'STATIC'|'ANIMATED'}>>}
 */
export async function getStickerInfo(storeUrl) {
  const cleaned = cleanUrl(storeUrl);

  const res = await fetch(cleaned, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari',
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch store page: ${res.status}`);

  const html = await res.text();
  const $ = cheerio.load(html);
  const urls = new Set();

  $('img, source').each((_, el) => {
    const cand =
      $(el).attr('data-src') || $(el).attr('data-original') || $(el).attr('srcset') || $(el).attr('src') || '';
    cand
      .split(',')
      .map((s) => s.trim().split(' ')[0])
      .filter(Boolean)
      .forEach((u) => {
        if (/^https?:\/\//.test(u) && /\.(png|apng|webp|gif|jpg|jpeg)(\?|$)/i.test(u)) {
          urls.add(u);
        }
      });
  });

  const pruned = [...urls].filter((u) => /stickershop|sticker|product|sticons|sticon/i.test(u));

  const list = pruned.map((u, i) => {
    const lower = u.toLowerCase();
    const type = lower.endsWith('.apng') || lower.includes('/animation/') ? 'ANIMATED' : 'STATIC';
    return { id: String(i + 1), url: u, type };
  });

  const unique = [];
  const seen = new Set();
  for (const item of list) {
    if (!seen.has(item.url)) {
      seen.add(item.url);
      unique.push(item);
    }
  }

  return unique;
}

/**
 * Convert APNG to GIF (stub)
 *
 * In browser JS, you need a WASM lib like `apng2gif` or `ffmpeg.wasm`
 * This function currently just returns the original bytes.
 *
 * @param {ArrayBuffer} apngBuffer
 * @returns {Promise<Uint8Array>} GIF bytes
 */
export async function convertApngToGif(apngBuffer) {
  // TODO: Integrate actual APNG → GIF conversion if needed
  return new Uint8Array(apngBuffer);
}

/**
 * Download sticker bytes and prepare file info
 *
 * @param {string} stickerUrl
 * @returns {Promise<{data:Uint8Array, fileName:string, mime:string, status:string}>}
 */
export async function getDownloadData(stickerUrl) {
  const res = await fetch(stickerUrl, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari',
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);

  const contentType = res.headers.get('content-type') || 'application/octet-stream';
  const buffer = await res.arrayBuffer();
  const urlParts = stickerUrl.split('/');
  let fileName = urlParts[urlParts.length - 1] || 'sticker';

  console.log({ fileName });

  let status = '原檔';
  let bytes = new Uint8Array(buffer);

  if (fileName.endsWith('.apng')) {
    bytes = await convertApngToGif(buffer);
    fileName = fileName.replace(/\.apng$/, '.gif');
    status = '已轉換為 GIF';
  }

  return { data: bytes, fileName, mime: contentType, status };
}

/**
 * Split an APNG into standalone PNG frames.
 * @param {ArrayBuffer} apngBuffer - raw bytes of the APNG
 * @returns {Array<{ png: Uint8Array, delay: number }>} frames, delay in ms
 */
export function apngToPng(apngBuffer) {
  // Decode APNG
  const img = UPNG.decode(apngBuffer);
  const { width, height, frames } = img;

  // Convert to an array of RGBA frame buffers (Uint8Array[])
  const rgbaFrames = /** @type {Uint8Array[]} */ (UPNG.toRGBA8(img));

  // Encode each RGBA frame back to a single-frame PNG
  return rgbaFrames.map((rgba, i) => {
    // UPNG.encode wants an ArrayBuffer per frame
    const encoded = UPNG.encode([rgba.buffer], width, height, 0); // 0 = lossless
    const delay = frames?.[i]?.delay ?? 100; // milliseconds (fallback 100ms)
    return { png: new Uint8Array(encoded), delay };
  });
}
