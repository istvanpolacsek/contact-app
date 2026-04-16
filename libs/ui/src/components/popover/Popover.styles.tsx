import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion } from 'motion/react';
import { type PopoverPlacement } from './constants';
import { Button } from '@contact-app/ui';
import { addTransparency } from '@contact-app/theme';

interface PopoverMenuStyledProps {
  $placement: PopoverPlacement;
}

function getPlacementStyles($placement: PopoverPlacement) {
  const offsetDistance = '8px';

  switch ($placement) {
    case 'top-left':
      return css`
        bottom: calc(100% + ${offsetDistance});
        left: 0;
      `;
    case 'top-right':
      return css`
        bottom: calc(100% + ${offsetDistance});
        right: 0;
      `;
    case 'bottom-left':
      return css`
        top: calc(100% + ${offsetDistance});
        left: 0;
      `;
    case 'bottom-right':
      return css`
        top: calc(100% + ${offsetDistance});
        right: 0;
      `;
    default:
      return css``;
  }
}

export const PopoverTriggerWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const PopoverMenuStyled = styled(motion.ul)<PopoverMenuStyledProps>(
  ({ $placement, theme }) => css`
    position: absolute;
    z-index: 1000;
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: ${theme.palette.colors.grey[80]};
    border-radius: 0.5rem;
    min-width: 10rem;
    overflow: hidden;

    ${getPlacementStyles($placement)}
  `,
);

export const PopoverMenuItemStyled = styled.li(
  () => css`
    padding: 0;
    margin: 0;
  `,
);

export const PopoverMenuItemButtonStyled = styled(motion.button)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    column-gap: 0.75rem;
    width: 100%;
    padding-block: 0.75rem;
    padding-inline: 0.625rem;
    border: none;
    background: transparent;
    font-family: ${theme.typography.fontFamilies.lexendDeca};
    color: ${addTransparency(theme.palette.colors.white, 56)};
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:focus {
      outline: none;
    }

    &[aria-selected='true'] {
      background-color: ${theme.palette.colors.grey[90]};
    }
  `,
);

export const PopoverMenuItemTitleStyled = styled.span(
  ({ theme }) => css`
    color: ${theme.palette.colors.white};
  `,
);
