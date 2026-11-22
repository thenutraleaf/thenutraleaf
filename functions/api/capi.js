// POST /api/capi : mirrors browser Pixel events to Meta. Event name + event_id must match the browser copy for deduplication.
import { json, sendToMeta } from '../lib/meta.js';
const NAMES = new Set(['PageView', 'ViewContent', 'WhatsAppContact']);
export async function onRequestPost({ request, env }) {
  if (!env.META_PIXEL_ID || !env.META_ACCESS_TOKEN) return json({ ok: false, error: 'not_configured' }, 503);
  const site = env.SITE_ORIGIN || 'https://thenutraleaf.com';
  const origin = request.headers.get('origin');
  if (origin && origin !== site && origin !== site.replace('//', '//www.')) return json({ ok: false }, 403);
  let b;
  try { const t = await request.text(); if (t.length > 4000) return json({ ok: false }, 413); b = JSON.parse(t); } catch { return json({ ok: false }, 400); }
  if (!NAMES.has(b.event_name) || typeof b.event_id !== 'string' || b.event_id.length < 8 || b.event_id.length > 80) return json({ ok: false, error: 'invalid_event' }, 400);
  if (typeof b.event_source_url !== 'string' || !b.event_source_url.startsWith(site)) return json({ ok: false, error: 'invalid_url' }, 400);
  const cd = b.custom_data || {}, c = {};
  if (Array.isArray(cd.content_ids)) c.content_ids = cd.content_ids.slice(0, 5).map(String);
  if (cd.content_type === 'product') c.content_type = 'product';
  if (typeof cd.content_name === 'string') c.content_name = cd.content_name.slice(0, 120);
  if (Array.isArray(cd.contents)) c.contents = cd.contents.slice(0, 5).map((x) => ({ id: String(x.id), quantity: Math.min(99, Math.max(1, Number(x.quantity) || 1)) }));
  if (typeof cd.value === 'number' && cd.value >= 0 && /^[A-Z]{3}$/.test(cd.currency || '')) { c.value = cd.value; c.currency = cd.currency; }
  const ok = /^fb\.\d\.\d+\.[\w-]+$/;
  const user_data = { client_ip_address: request.headers.get('CF-Connecting-IP') || undefined, client_user_agent: request.headers.get('user-agent') || undefined };
  if (ok.test(b.fbp || '')) user_data.fbp = b.fbp;
  if (ok.test(b.fbc || '')) user_data.fbc = b.fbc;
  const sent = await sendToMeta(env, [{ event_name: b.event_name, event_time: Math.floor(Date.now() / 1000), event_id: b.event_id, event_source_url: b.event_source_url, action_source: 'website', user_data, custom_data: c }]);
  return json({ ok: sent }, sent ? 200 : 502);
}
