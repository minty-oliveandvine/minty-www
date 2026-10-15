import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { siteConfig } from '@/config/site';
import './globals.css';

// Plus Jakarta Sans, self-hosted through next/font as the three app frontends host Inter
// (2026-10-12). This replaced a Google Fonts <link>: next/font also generates a metric-matched
// fallback @font-face (src: local(Arial) with size-adjust / ascent-override), so the site no
// longer reflows when the webfont lands.
//
// The FACE is this site's documented exception to "Jakarta is for the Minty name only": the mark
// here is an image (layout/Navbar.tsx, layout/Footer.tsx, get-started/Hero-Section.tsx) and the
// whole page is brand surface, so Jakarta is the body face throughout. Only the MECHANISM is
// unified. No `weight` array, so this is the variable font - the site genuinely uses
// 400/500/600/700/800, and one variable file beats five static ones.
// The stacks that consume --font-jakarta live in tailwind.config.ts; change the two together.
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}`, //  — ${siteConfig.tagline}
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  robots: {
    index: true, follow: true,
    googleBot: {
      index: true, follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website', locale: 'en_US',
    url: siteConfig.url, siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.social.twitter,
  },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  alternates: { canonical: siteConfig.url },
  category: 'business',
};

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, themeColor: '#2fb8a6',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '280', priceCurrency: 'HKD' },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  };

  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}