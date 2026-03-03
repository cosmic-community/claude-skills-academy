import { createBucketClient } from '@cosmicjs/sdk';

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

export async function getGameSettings() {
  try {
    const response = await cosmic.objects
      .find({ type: 'game-settings' })
      .props(['title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    return [];
  }
}

export async function getBucketSlug(): Promise<string> {
  return process.env.COSMIC_BUCKET_SLUG as string;
}