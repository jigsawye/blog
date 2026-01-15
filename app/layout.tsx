import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import { createMetadata, baseUrl } from '@/lib/metadata';
import './global.css';
import { AlbumIcon } from 'lucide-react';

export const metadata = createMetadata({
  title: {
    template: '%s | JIGSAWYE',
    default: 'JIGSAWYE',
  },
  description: 'description',
  metadataBase: baseUrl,
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative flex min-h-screen flex-col">
        <RootProvider search={{ enabled: false }}>
          <HomeLayout
            {...baseOptions()}
            links={[
              {
                icon: <AlbumIcon />,
                text: 'Blog',
                url: '/blog',
                active: 'nested-url',
              },
            ]}
          >
            {children}
          </HomeLayout>
        </RootProvider>
      </body>
    </html>
  );
}
