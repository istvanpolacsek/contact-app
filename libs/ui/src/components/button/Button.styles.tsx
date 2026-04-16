import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { type ButtonVariants } from './constants';
import { addHoverEffect, addTransparency } from '@contact-app/theme';

import { motion } from 'motion/react';

interface ButtonStyledProps {
  $variant: ButtonVariants;
}

export const ButtonStyled = styled(motion.button)<ButtonStyledProps>(
  ({ theme, $variant }) => css`
    display: flex;
    column-gap: 8px;
    align-items: center;
    justify-content: center;
    padding-inline: 0.75rem;
    padding-block: 0.5rem;
    font-family: ${theme.typography.fontFamilies.lexendDeca};
    color: ${theme.palette.colors.white};
    font-weight: 400;
    font-size: 0.875rem;
    min-height: 1.5rem;
    box-sizing: content-box;
    border: unset;

    ${addHoverEffect(css`
      cursor: pointer;
    `)}

    ${(() => {
      switch ($variant) {
        case 'primary':
          return css`
            border-radius: 0.5rem;
          `;
        case 'secondary':
          return css`
            border-radius: 0.5rem;
          `;
        case 'special':
          return css`
            border-radius: 100vh;
            border: 1px solid ${theme.palette.colors.grey[20]};
            position: relative;
            background-color: transparent;

            &::before {
              position: absolute;
              overflow: hidden;
              z-index: -1;
              content: '';
              background: linear-gradient(
                to bottom,
                ${addTransparency(theme.palette.colors.grey[60], 30)} 0%,
                ${theme.palette.colors.grey[60]} 100%
              );
              inset: 0;
              border-radius: inherit;
            }
          `;
        default:
          return css``;
      }
    })()};
  `,
);
