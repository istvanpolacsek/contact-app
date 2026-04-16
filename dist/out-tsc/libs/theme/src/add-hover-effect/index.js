import { css } from '@emotion/react';
function addHoverEffect(style) {
    return css `
    @media screen and (hover: hover) {
      ${style};
    }
  `;
}
export default addHoverEffect;
//# sourceMappingURL=index.js.map