// Shared helpers for Meta Conversions API (server-side only; token comes from env vars)
export const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json' } });
export async function sha256(v) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(v));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
}
export async function sendToMeta(env, events) {
  const url = `https://graph.facebook.com/v21.0/${env.META_PIXEL_ID}/events`;
  const body = { data: events, access_token: env.META_ACCESS_TOKEN };
  if (env.META_TEST_EVENT_CODE) body.test_event_code = env.META_TEST_EVENT_CODE;
  const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) { const e = await r.json().catch(() => ({})); console.error('Meta CAPI error', r.status, e?.error?.message || ''); }
  return r.ok;
}
