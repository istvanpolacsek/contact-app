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
  const isValidUrl = getIsValidUrl(src);

  return (
    <ImageContainerStyled $aspectRatio={aspectRatio}>
      {src && isValidUrl && !error ? (
        <NextImage
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          onError={() => setError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <ImgElementStyled src="/placeholder.png" alt={alt} width={256} height={256} />
      )}
    </ImageContainerStyled>
  );
};

export default Image;

function getIsValidUrl(src?: string): boolean {
  if (src) {
    try {
      new URL(src);

      return true;
    } catch {
      return false;
    }
  } else {
    return false;
  }
}
