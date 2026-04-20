export function getImageUrl(photoSlug?: string | null): string | undefined {
  if (!photoSlug) return undefined;

  if (
    photoSlug.startsWith('http://') ||
    photoSlug.startsWith('https://') ||
    photoSlug.startsWith('data:')
  ) {
    return photoSlug;
  }

  const endpoint = process.env.NEXT_PUBLIC_S3_ENDPOINT_PUBLIC || 'http://localhost:9000';
  const bucket = process.env.NEXT_PUBLIC_S3_BUCKET || 'contact-app-media';

  return `${endpoint}/${bucket}/${photoSlug}`;
}
