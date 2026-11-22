// ===== CENTRAL CONFIGURATION: edit values here only =====
export const site = {
  brand: 'The NutraLeaf',
  url: 'https://thenutraleaf.com',
  whatsapp: '923043210320',            // digits only, with country code
  whatsappDisplay: '+923043210320',
  email: 'order@thenutraleaf.com',
  facebookUrl: 'https://www.facebook.com/thenutraleaf',
  announcement: 'Discover The NutraLeaf — A Thoughtfully Crafted Herbal Blend',
};
export const product = {
  name: 'NutraLeaf Herbal Wellness Blend',
  tagline: 'Nature. Nourish. Thrive.',
  description: 'A blend of carefully selected herbs and natural nutrients to help support energy, stamina, immunity and overall wellness.',
  format: 'Herbal supplement',
  id: 'NUTRALEAF-HWB-001',             // one stable ID: used in Pixel, Conversions API and the catalog feed
  quantity: '',                        // pack size is not on the label: add when confirmed (hidden while empty)
  priceValue: null,                    // number, e.g. 2500. Leave null until confirmed
  currency: 'PKR',                     // CONFIRM your selling currency
  availability: 'in stock',            // CONFIRM before submitting the feed
  quantities: ['1', '2', '3'],         // pack counts offered in the order selector
};
product.price = product.priceValue ? `${product.currency} ${product.priceValue}` : '';
export const meta = {
  pixelId: '4169591466510100',            // paste your Meta Pixel ID (public, safe here)
  catalogId: '',          // optional, for reference
  domainVerification: '', // paste the facebook-domain-verification code from Meta (optional)
};
export const waLink = (msg) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
export const generalMsg = 'Hello The NutraLeaf! I am interested in ordering your herbal blend. Please share the price and ordering details.';
export const orderMsg = (qty = '1') =>
  `Hello The NutraLeaf! I would like to order ${product.name}. Quantity: ${qty}.` +
  (product.price ? ` Price: ${product.price}.` : '') + ' Please confirm availability and delivery details.';
export const ingredients = [ // all text from the product label
  ['Moringa', 'Rich in vitamins and antioxidants; supports energy and immunity.'],
  ['Ashwagandha', 'Helps reduce stress and supports strength and stamina.'],
  ['Shatavari', "Traditionally used to support vitality and women's wellness."],
  ['Safed Musli', 'Known to support strength, stamina and overall vitality.'],
  ['Fennel', 'Aids digestion and helps support overall gut well-being.'],
  ['Amla', 'Rich in Vitamin C; supports immunity and hair health.'],
  ['Flaxseed', 'Source of omega-3 and fiber; supports heart and digestion.'],
  ['Mishri', 'Natural rock sugar; provides energy and soothes the body.'],
  ['Ginseng', 'Helps improve energy, stamina and mental performance.'],
];
