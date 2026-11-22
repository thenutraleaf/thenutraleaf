import { site, product } from '../config.js';
const x = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const GET = () => {
  const ready = product.priceValue && product.priceValue > 0;
  const items = ready ? product.packs.map((n: number) => {
    const label = n === 1 ? '1 pack' : n + ' packs';
    return `<item>
<g:id>${x(product.id)}-${n}PACK</g:id><g:item_group_id>${x(product.id)}</g:item_group_id><g:title>${x(product.name)} (${label})</g:title><g:description>${x(product.description)} Pack option: ${label}.</g:description>
<g:availability>${x(product.availability)}</g:availability><g:condition>new</g:condition>
<g:price>${(Number(product.priceValue) * n).toFixed(2)} ${product.currency}</g:price>
<g:link>${site.url}/</g:link><g:image_link>${site.url}/images/product-main.jpg</g:image_link>
<g:additional_image_link>${site.url}/images/product-2.jpg</g:additional_image_link><g:additional_image_link>${site.url}/images/product-3.jpg</g:additional_image_link>
<g:brand>NutraLeaf</g:brand><g:google_product_category>Health &amp; Beauty &gt; Health Care &gt; Vitamins &amp; Supplements</g:google_product_category>
</item>`;
  }).join('\n') : '<!-- Feed is empty until product.priceValue is set in src/config.js -->';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel><title>${x(site.brand)}</title><link>${site.url}</link><description>${x(site.brand)} product feed</description>
${items}
</channel></rss>`, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
};
