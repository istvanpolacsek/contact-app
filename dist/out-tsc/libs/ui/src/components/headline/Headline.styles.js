import styled from '@emotion/styled';
import { css } from '@emotion/react';
export const HeadlineStyled = styled.h2(({ theme, as = 'h2' }) => css `
    color: ${theme.palette.colors.white};

    ${(() => {
    switch (as) {
        case 'h1':
            return css `
            font-family: ${theme.typography.fontFamilies.glysa};
            font-size: 2rem;
            font-weight: 500;
            line-height: 3rem;
            letter-spacing: 0;
          `;
        case 'h2':
            return css `
            font-family: ${theme.typography.fontFamilies.glysa};
            font-size: 1.5rem;
            font-weight: 500;
            line-height: 2.5rem;
            letter-spacing: 0;
          `;
        default:
            return css `
            font-family: ${theme.typography.fontFamilies.lexendDeca};
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5rem;
            letter-spacing: 1%;
          `;
    }
})()};
  `);
//# sourceMappingURL=Headline.styles.js.map