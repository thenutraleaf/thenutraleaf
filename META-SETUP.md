# Meta setup guide (Pixel, Conversions API, Catalog)

## 1. Environment variables (Cloudflare Pages > Settings > Variables and Secrets)
| Name | Type | Notes |
|---|---|---|
| META_PIXEL_ID | Text | your Pixel ID |
| META_ACCESS_TOKEN | **Secret** | Events Manager > your Pixel > Settings > Conversions API > Generate access token |
| META_TEST_EVENT_CODE | Text (temporary) | only while testing; delete afterwards |
| SITE_ORIGIN | Text (optional) | defaults to https://thenutraleaf.com |
| ORDER_WEBHOOK_SECRET | **Secret** | only if you later connect order confirmation (`/api/purchase`) |

Then put the same Pixel ID in `src/config.js` (`meta.pixelId`; it is public) and redeploy. The cookie banner and tracking stay off while it is empty.

## 2. Domain verification
Business Settings > Brand Safety > Domains > Add `thenutraleaf.com` > choose **Meta-tag verification**, copy the code into `meta.domainVerification` in `src/config.js`, deploy, then click Verify.

## 3. Catalog feed
1. Set `product.priceValue` (a number), `currency` and `availability` in `src/config.js`. The feed stays empty until the price is set.
2. Deploy and open https://thenutraleaf.com/meta-product-feed.xml to check it.
3. Commerce Manager > your catalog > Data sources > Add items > **Data feed** > enter that URL > schedule daily fetch.
4. Check Diagnostics and fix any warnings. Product ID `NUTRALEAF-HWB-001` equals `content_ids` in Pixel events.

## 4. Test events
Events Manager > Test events > enter the site URL (set META_TEST_EVENT_CODE for server events). Accept cookies. Expect PageView, ViewContent (scroll to the product section) and WhatsAppContact (click an order button). Each should show browser and server copies marked as deduplicated. Meta Pixel Helper (Chrome) should show one Pixel, loaded once.

## 5. Purchase
WhatsApp clicks never send Purchase. When you have a trusted order system, POST confirmed orders to `/api/purchase` (see header comment in `functions/api/purchase.js`).
