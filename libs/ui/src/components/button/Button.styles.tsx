import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { type ButtonVariants } from './constants';
import { addHoverEffect, addTransparency } from '@contact-app/theme';

interface ButtonStyledProps {
  $variant: ButtonVariants;
}

export const ButtonStyled = styled.button<ButtonStyledProps>(
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
            background-color: ${theme.palette.colors.grey[60]};
            border-radius: 0.5rem;
          `;
        case 'secondary':
          return css`
            background-color: transparent;
            border-radius: 0.5rem;
          `;
        case 'special':
          return css`
            background:
              linear-gradient(
                0deg,
                ${theme.palette.colors.grey[100]},
                ${theme.palette.colors.grey[100]}
              ),
              linear-gradient(
                180deg,
                ${addTransparency(theme.palette.colors.grey[60], 30)} 0%,
                ${theme.palette.colors.grey[60]} 100%
              );
            border-radius: 100vh;
            border: 1px solid ${theme.palette.colors.grey[20]};
          `;
        default:
          return css``;
      }
    })()};
  `,
);
