import type { Metadata } from 'next';
import './globals.css';
import CosmicBadge from '@/components/CosmicBadge';

export const metadata: Metadata = {
  title: 'Claude Skills Academy | Learn to Master Claude AI',
  description: 'An interactive, gamified learning experience that teaches you how to effectively use Claude AI through progressive lessons, quizzes, and challenges.',
  keywords: ['Claude', 'AI', 'learning', 'prompt engineering', 'Anthropic', 'Cosmic'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="font-sans antialiased min-h-screen bg-dark-950">
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  );
}