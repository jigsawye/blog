import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import Logo from '@/public/logo.svg';

export const logo = (
  <>
    <Image alt="JIGSAWYE" src={Logo} width={20} height={20} aria-label="JIGSAWYE" />
  </>
);

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          {logo}
          <span className="font-medium">JIGSAWYE</span>
        </>
      ),
    },
  };
}
