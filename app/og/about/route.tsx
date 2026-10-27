import { ImageResponse } from '@takumi-rs/image-response';
import {
  getImageResponseOptions,
  MetadataDescription,
  MetadataImage,
  MetadataTitle,
} from '@/lib/og/generate';

export const revalidate = false;

export async function GET() {
  return new ImageResponse(
    <MetadataImage accentColor="rgb(34,197,94)">
      <MetadataTitle>About</MetadataTitle>
      <MetadataDescription>
        Frontend platforms, product outcomes, and team collaboration through design systems and AI
        workflows.
      </MetadataDescription>
    </MetadataImage>,
    await getImageResponseOptions(),
  );
}
