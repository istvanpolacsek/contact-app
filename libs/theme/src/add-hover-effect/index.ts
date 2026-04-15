import type { SerializedStyles } from '@emotion/utils';
import { css } from '@emotion/react';

function addHoverEffect(style: SerializedStyles): SerializedStyles {
  return css`
    @media screen and (hover: hover) {
      ${style};
    }
  `;
}

export default addHoverEffect;
