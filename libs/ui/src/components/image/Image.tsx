import { type FC, useState } from 'react';
import NextImage from 'next/image';
import { ImageContainerStyled, ImgElementStyled } from './Image.styles';

export interface ImageProps {
  src?: string;
  alt: string;
  aspectRatio?: string;
}

const Image: FC<ImageProps> = ({ src, alt, aspectRatio = '1/1' }) => {
  const [error, setError] = useState<boolean>(false);

  const imageUrl = convertToImageUrl(src);
  const isValidUrl = getIsValidUrl(imageUrl);
  const isRemoteS3 = isRemoteS3Image(imageUrl);

  return (
    <ImageContainerStyled $aspectRatio={aspectRatio}>
      {imageUrl && isValidUrl && !error ? (
        <NextImage
          src={imageUrl}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          onError={() => setError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={isRemoteS3}
        />
      ) : (
        <ImgElementStyled src="/placeholder.png" alt={alt} width={256} height={256} />
      )}
    </ImageContainerStyled>
  );
};

export default Image;

function getIsValidUrl(src?: string): boolean {
  if (!src) return false;

  if (src.startsWith('data:')) {
    return true;
  }

  try {
    new URL(src);
    return true;
  } catch {
    return false;
  }
}

function convertToImageUrl(src?: string): string | undefined {
  if (!src) return undefined;

  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }

  const endpoint = process.env.NEXT_PUBLIC_S3_ENDPOINT_PUBLIC || 'http://localhost:9000';
  const bucket = process.env.NEXT_PUBLIC_S3_BUCKET || 'contact-app-media';

  return `${endpoint}/${bucket}/${src}`;
}

function isRemoteS3Image(imageUrl?: string): boolean {
  if (!imageUrl) return false;

  const endpoint = process.env.NEXT_PUBLIC_S3_ENDPOINT_PUBLIC || 'http://localhost:9000';
  return imageUrl.startsWith(endpoint);
}
