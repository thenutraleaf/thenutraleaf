# The NutraLeaf website (Astro, static)

## Edit content
Everything editable lives in `src/config.js`: brand, URL, WhatsApp, email, Facebook URL (**TODO**), product name, price, quantity (**TODO**), announcement text, testimonials (placeholders), ingredients.
Items marked `[Editable: ...]` in `src/pages/index.astro` (How to Use, Privacy/Terms) need your real text.

## Run locally
```
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
```

## Deploy to Cloudflare Pages
1. Push this folder to a GitHub repository.
2. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git.
3. Framework preset: Astro. Build command: `npm run build`. Output directory: `dist`.
4. Deploy, then add the custom domain `thenutraleaf.com` under Custom domains.
Sitemap is generated at `/sitemap-index.xml`.
