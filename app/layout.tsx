import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const siteUrl = 'https://stuartsaliadarre.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Stuart Saliadarre | AI & Marketing Consultant | Meta Ads Specialist',
  description:
    'AI and marketing consultant helping businesses grow with Meta Ads, automation, and intelligent strategy. Tailored solutions, measurable results.',
  keywords: [
    'AI consultant',
    'marketing consultant',
    'Meta Ads specialist',
    'Facebook Ads consultant',
    'AI strategy',
    'marketing automation',
    'fractional CMO',
    'business growth consultant',
    'Meta Ads Australia',
    'AI consulting Australia',
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Stuart Saliadarre | AI & Marketing Consultant | Meta Ads Specialist',
    description:
      'AI and marketing consultant helping businesses grow with Meta Ads, automation, and intelligent strategy. Tailored solutions, measurable results.',
    siteName: 'Stuart Saliadarre',
    images: [{ url: '/stuart.jpg', width: 1200, height: 630, alt: 'Stuart Saliadarre — AI & Marketing Consultant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stuart Saliadarre | AI & Marketing Consultant | Meta Ads Specialist',
    description:
      'AI and marketing consultant helping businesses grow with Meta Ads, automation, and intelligent strategy. Tailored solutions, measurable results.',
    images: ['/stuart.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Stuart Saliadarre',
  jobTitle: 'AI & Marketing Consultant',
  url: siteUrl,
  email: 'saliadar@gmail.com',
  knowsAbout: [
    'AI Strategy',
    'Marketing Consulting',
    'Meta Ads',
    'Facebook Ads',
    'Marketing Automation',
    'Fractional CMO',
  ],
  offers: {
    '@type': 'Offer',
    itemOffered: [
      { '@type': 'Service', name: 'AI Strategy & Consulting' },
      { '@type': 'Service', name: 'Facebook & Meta Ads' },
      { '@type': 'Service', name: 'Marketing Consulting' },
      { '@type': 'Service', name: 'Marketing Automation' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
