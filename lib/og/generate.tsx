import type { ReactNode } from 'react';
import { readFile } from 'node:fs/promises';
import type { ImageResponseOptions } from '@takumi-rs/image-response';

export interface MetadataImageProps {
  children: ReactNode;
  eyebrow?: ReactNode;
  accentColor?: string;
  backgroundColor?: string;
}

const jetBrainsMono = readFile('./lib/og/JetBrainsMono-VariableFont_wght.ttf').then((data) => ({
  name: 'JetBrains Mono',
  data,
}));
const notoSansTC = readFile('./lib/og/NotoSansTC-VariableFont_wght.ttf').then((data) => ({
  name: 'Noto Sans TC',
  data,
}));

const logo = (
  <svg width="60" height="60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" rx="30" fill="white" />
    <path
      d="M120 40V60H140C151.046 60 160 68.9543 160 80V100C148.954 100 140 108.954 140 120C140 131.046 148.954 140 160 140V160C160 171.046 151.046 180 140 180H120V160C120 148.954 111.046 140 100 140C88.9543 140 80 148.954 80 160V180H60C48.9543 180 40 171.046 40 160V140H60C71.046 140 80 131.046 80 120C80 108.954 71.046 100 60 100H40V80C40 68.9543 48.9543 60 60 60H80V40C80 28.9543 88.9543 20 100 20C111.046 20 120 28.9543 120 40Z"
      fill="black"
    />
  </svg>
);

function MetadataEyebrow({ children, accentColor }: { children: ReactNode; accentColor: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '28px',
        gap: '12px',
      }}
    >
      <span
        style={{
          width: '48px',
          height: '6px',
          borderRadius: '999px',
          backgroundColor: accentColor,
        }}
      />
      <span
        style={{
          fontSize: '28px',
          fontWeight: 600,
          textTransform: 'uppercase',
          color: 'rgba(240,240,240,0.75)',
        }}
      >
        {children}
      </span>
    </div>
  );
}

function BrandRow() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        color: 'rgb(240,240,240)',
      }}
    >
      {logo}
      <span
        style={{
          fontSize: '48px',
          fontWeight: 600,
        }}
      >
        JIGSAWYE
      </span>
    </div>
  );
}

export async function getImageResponseOptions(): Promise<ImageResponseOptions> {
  return {
    width: 1200,
    height: 630,
    format: 'webp',
    fonts: await Promise.all([jetBrainsMono, notoSansTC]),
  };
}

export function MetadataImage({
  children,
  eyebrow,
  accentColor,
  backgroundColor,
}: MetadataImageProps) {
  const resolvedAccentColor = accentColor ?? 'rgb(99,102,241)';
  const resolvedBackgroundColor = backgroundColor ?? 'rgb(10,10,10)';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        color: 'rgb(240,240,240)',
        backgroundColor: resolvedBackgroundColor,
        padding: '4rem',
        gap: '8px',
      }}
    >
      <MetadataEyebrow accentColor={resolvedAccentColor}>{eyebrow}</MetadataEyebrow>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 16,
          paddingBottom: 16,
          flexGrow: 1,
          gap: '24px',
        }}
      >
        {children}
      </div>
      <BrandRow />
    </div>
  );
}

export function MetadataTitle({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        fontWeight: 600,
        fontSize: '72px',
      }}
    >
      {children}
    </span>
  );
}

export function MetadataDescription({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        fontSize: '48px',
      }}
    >
      {children}
    </span>
  );
}
