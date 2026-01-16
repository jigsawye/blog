import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX({});

const config = {
  reactStrictMode: true,
  serverExternalPackages: ['@takumi-rs/image-response'],
};

export default withMDX(config);
