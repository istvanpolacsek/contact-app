import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ImageContainerStyledProps {
  $aspectRatio?: string;
}

export const ImageContainerStyled = styled.div<ImageContainerStyledProps>(
  ({ $aspectRatio = '1/1' }) => css`
    position: relative;
    aspect-ratio: ${$aspectRatio};
    width: 100%;
    height: auto;
    overflow: hidden;
  `,
);

export const ImgElementStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
