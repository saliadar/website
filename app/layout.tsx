import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stuart Saliadarre — AI & Marketing Consultant',
  description:
    'Stuart Saliadarre is an AI and marketing consultant helping businesses grow through intelligent strategy, automation, and high-performance Meta Ads.',
  keywords: ['AI consultant', 'marketing consultant', 'Meta Ads', 'Facebook Ads', 'AI strategy', 'business growth'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
