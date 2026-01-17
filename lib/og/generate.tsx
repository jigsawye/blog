import type { ReactNode } from 'react';
import { readFile } from 'node:fs/promises';
import type { ImageResponseOptions } from '@takumi-rs/image-response';

export interface GenerateProps {
  title: ReactNode;
  description?: ReactNode;
}

const jetBrainsMono = readFile('./lib/og/JetBrainsMono-VariableFont_wght.ttf').then((data) => ({
  name: 'JetBrains Mono',
  data,
}));
const notoSansTC = readFile('./lib/og/NotoSansTC-VariableFont_wght.ttf').then((data) => ({
  name: 'Noto Sans TC',
  data,
}));

export async function getImageResponseOptions(): Promise<ImageResponseOptions> {
  return {
    width: 1200,
    height: 630,
    format: 'webp',
    fonts: await Promise.all([jetBrainsMono, notoSansTC]),
  };
}

export function MetadataImage({ title, description }: GenerateProps) {
  const siteName = 'JIGSAWYE';
  const primaryTextColor = 'rgb(240,240,240)';
  const logo = (
    <svg
      width="60"
      height="60"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="200" rx="30" fill="white" />
      <path
        d="M120 40V60H140C151.046 60 160 68.9543 160 80V100C148.954 100 140 108.954 140 120C140 131.046 148.954 140 160 140V160C160 171.046 151.046 180 140 180H120V160C120 148.954 111.046 140 100 140C88.9543 140 80 148.954 80 160V180H60C48.9543 180 40 171.046 40 160V140H60C71.046 140 80 131.046 80 120C80 108.954 71.046 100 60 100H40V80C40 68.9543 48.9543 60 60 60H80V40C80 28.9543 88.9543 20 100 20C111.046 20 120 28.9543 120 40Z"
        fill="black"
      />
    </svg>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        color: 'white',
        backgroundColor: 'rgb(10,10,10)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: '4rem',
        }}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: '76px',
          }}
        >
          {title}
        </span>
        <p
          style={{
            fontSize: '48px',
            color: 'rgba(240,240,240,0.7)',
          }}
        >
          {description}
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '24px',
            marginTop: 'auto',
            color: primaryTextColor,
          }}
        >
          {logo}
          <span
            style={{
              fontSize: '46px',
              fontWeight: 600,
            }}
          >
            {siteName}
          </span>
        </div>
      </div>
    </div>
  );
}
