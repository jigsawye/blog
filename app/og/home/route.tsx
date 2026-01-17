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
    <MetadataImage accentColor="rgb(56,189,248)">
      <MetadataTitle>Hi, I'm Evan.</MetadataTitle>
      <MetadataDescription>
        Building digital experiences, curating fits, and capturing moments — usually in that order.
      </MetadataDescription>
    </MetadataImage>,
    await getImageResponseOptions(),
  );
}
