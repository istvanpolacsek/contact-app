import { type PropsWithChildren } from 'react';
import { EmotionCache } from '@contact-app/theme';

export const metadata = {
  title: 'Contact app',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <EmotionCache>
      <html lang="en">
        <body>{children}</body>
      </html>
    </EmotionCache>
  );
}
