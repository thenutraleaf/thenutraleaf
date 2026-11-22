// POST /api/purchase : call ONLY from your own trusted order system after an order is genuinely confirmed.
// Header: Authorization: Bearer <ORDER_WEBHOOK_SECRET>
// Body: { order_id, value, currency, items:[{id,quantity,item_price}], email?, phone?, action_source? }
import { json, sha256, sendToMeta } from '../lib/meta.js';
export async function onRequestPost({ request, env }) {
  if (!env.META_PIXEL_ID || !env.META_ACCESS_TOKEN || !env.ORDER_WEBHOOK_SECRET) return json({ ok: false, error: 'not_configured' }, 503);
  const given = (request.headers.get('authorization') || '').replace(/^Bearer /, '');
  const [a, b] = await Promise.all([sha256(given), sha256(env.ORDER_WEBHOOK_SECRET)]);
  if (a !== b) return json({ ok: false }, 401);
  let o; try { o = await request.json(); } catch { return json({ ok: false }, 400); }
  if (!o.order_id || !(o.value >= 0) || !/^[A-Z]{3}$/.test(o.currency || '') || !Array.isArray(o.items) || !o.items.length) return json({ ok: false, error: 'invalid_order' }, 400);
  const user_data = {};
  if (o.email) user_data.em = [await sha256(String(o.email).trim().toLowerCase())];
  if (o.phone) user_data.ph = [await sha256(String(o.phone).replace(/\D/g, ''))];
  const ev = { event_name: 'Purchase', event_time: Math.floor(Date.now() / 1000), event_id: `purchase_${o.order_id}`, action_source: ['chat', 'phone_call', 'physical_store', 'system_generated', 'other'].includes(o.action_source) ? o.action_source : 'chat', user_data,
    custom_data: { value: o.value, currency: o.currency, content_type: 'product', content_ids: o.items.map((i) => String(i.id)), contents: o.items.map((i) => ({ id: String(i.id), quantity: Number(i.quantity) || 1, item_price: i.item_price })) } };
  const ok = await sendToMeta(env, [ev]);
  return json({ ok }, ok ? 200 : 502);
}
