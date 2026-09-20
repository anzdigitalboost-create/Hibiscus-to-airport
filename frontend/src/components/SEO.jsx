import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import siteConfig from '../config/siteConfig';

/**
 * Page meta helper with the same props as the bookaride.co.nz `SEO`
 * component, so the mirrored booking page renders unchanged here.
 * Site-specific pages keep using PageMeta.
 */
export const SEO = ({ title, description, keywords, canonical, ogImage, ogType = 'website' }) => {
  const location = useLocation();
  const siteUrl = siteConfig.siteUrl;
  const fullTitle = title ? `${title} | ${siteConfig.siteName}` : siteConfig.siteName;
  const metaDescription = description || siteConfig.description;
  const metaKeywords = keywords || siteConfig.keywords;

  let path = canonical || location.pathname;
  if (/^https?:\/\//i.test(path)) {
    try { path = new URL(path).pathname; } catch { path = location.pathname; }
  }
  if (!path.startsWith('/')) path = `/${path}`;
  const canonicalUrl = `${siteUrl}${path === '/' ? '/' : path}`;
  const imageUrl = ogImage || `${siteUrl}/og-image.svg`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content="en_NZ" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;
