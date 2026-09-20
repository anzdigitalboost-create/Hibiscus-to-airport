// Site branding consumed by the mirrored booking page (src/pages/BookNow.jsx)
// and the SEO helper. The booking page itself is copied verbatim from
// bookaride.co.nz and reads these keys — keep the key names intact.
const siteConfig = {
  siteName: 'Hibiscus to Airport',
  domain: 'hibiscustoairport.co.nz',
  siteUrl: 'https://hibiscustoairport.co.nz',
  email: 'info@bookaride.co.nz',
  phone: '021 743 321',
  tagline: 'Premium Airport Shuttle Service — Hibiscus Coast to Auckland Airport',
  description:
    'Premium airport shuttle service from Hibiscus Coast to Auckland Airport. Professional drivers, luxury vehicles, 24/7 service. Book online instantly with guaranteed pickup times.',
  keywords:
    'airport shuttle, Hibiscus Coast, Auckland Airport, premium transport, Orewa, Whangaparaoa, luxury transfer',
  maintenanceMode: false,
}

export const getSiteConfig = () => siteConfig
export default siteConfig
