// ===== CENTRAL CONFIGURATION: edit values here only =====
export const site = {
  brand: 'The NutraLeaf',
  url: 'https://thenutraleaf.com',
  whatsapp: '923131165698',            // digits only, with country code
  whatsappDisplay: '+923131165698',
  email: 'order@thenutraleaf.com',
  facebookUrl: 'https://www.facebook.com/', // TODO: replace with your Facebook page URL
  announcement: 'Discover The NutraLeaf — A Thoughtfully Crafted Herbal Blend',
};
export const product = {
  name: 'NutraLeaf Herbal Wellness Blend',
  tagline: 'Nature. Nourish. Thrive.',
  description: 'A blend of carefully selected herbs and natural nutrients to help support energy, stamina, immunity and overall wellness.',
  format: 'Herbal supplement',
  quantity: 'TODO: add pack size (e.g. 100 g / 60 capsules)', // not on label
  price: '',                           // TODO: e.g. 'Rs. 0,000'. Leave empty to show "Message us for price"
  quantities: ['1', '2', '3'],         // pack counts offered in the order selector
};
export const waLink = (msg) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
export const generalMsg = 'Hello The NutraLeaf! I am interested in ordering your herbal blend. Please share the price and ordering details.';
export const orderMsg = (qty = '1') =>
  `Hello The NutraLeaf! I would like to order ${product.name}. Quantity: ${qty}.` +
  (product.price ? ` Price: ${product.price}.` : '') + ' Please confirm availability and delivery details.';
export const testimonials = [ // PLACEHOLDERS: replace with real, permitted customer feedback
  { text: 'Placeholder: add a real customer comment here.', name: 'Customer name', place: 'City' },
  { text: 'Placeholder: add a real customer comment here.', name: 'Customer name', place: 'City' },
  { text: 'Placeholder: add a real customer comment here.', name: 'Customer name', place: 'City' },
];
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
