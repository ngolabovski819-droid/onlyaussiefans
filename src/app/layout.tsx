import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AgeGate from '@/components/AgeGate';

const GA_ID = 'G-GM5D7P0C39';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const syne  = Syne({ subsets: ['latin'], variable: '--font-syne',  display: 'swap', weight: ['700', '800'] });

const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL  ?? 'https://onlyaussiefans.com';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'OnlyAussieFans';

export const metadata: Metadata = {
  title: {
    default: 'OnlyAussieFans — #1 Australian OnlyFans Search Engine',
    template: '%s | OnlyAussieFans',
  },
  description:
    'Find the best Australian OnlyFans creators. Search by location, category, price and more. 500+ verified Aussie creators — updated daily.',
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    siteName: SITE_NAME,
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: SITE_URL,
    languages: { 'en-AU': SITE_URL },
  },
  other: {
    rating: 'adult',
    'revisit-after': '3 days',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: 'The #1 Australian OnlyFans search engine — find Aussie creators by location, category and price.',
      inLanguage: 'en-AU',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      url: SITE_URL,
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <meta name="rating" content="adult" />
        <meta name="DC.language" content="en-AU" />
        <link rel="preconnect" href="https://images.weserv.nl" />
        <link rel="alternate" hrefLang="en-AU" href={SITE_URL} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <AgeGate />
        <Nav />
        <main>{children}</main>
        <Footer />
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}

