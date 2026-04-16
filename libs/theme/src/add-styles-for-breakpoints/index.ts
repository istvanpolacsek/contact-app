import type { SerializedStyles } from '@emotion/utils';

import { map } from 'lodash';
import { css } from '@emotion/react';
import { BREAKPOINT_DICTIONARY, type Breakpoints } from '../emotion-cache/theme';

function addStylesForBreakpoints(
  styles: SerializedStyles,
  ...forBreakpoints: Breakpoints[]
): SerializedStyles {
  return css`
    ${map(forBreakpoints, (breakpoint) => {
      const [from, to] = BREAKPOINT_DICTIONARY[breakpoint];

      switch (breakpoint) {
        case 'xs':
          return css`
            @media screen and (max-width: ${to}px) {
              ${styles};
            }
          `;
        case 'xl':
          return css`
            @media screen and (min-width: ${from}px) {
              ${styles};
            }
          `;
        default:
          return css`
            @media screen and (min-width: ${from}px) and (max-width: ${to}px) {
              ${styles};
            }
          `;
      }
    })}
  `;
}

export default addStylesForBreakpoints;
