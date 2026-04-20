import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion } from 'motion/react';
import { addStylesForBreakpoints, addTransparency } from '@contact-app/theme';

export const ContactListItemStyled = styled(motion.li)(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: minmax(0, 2.5rem) minmax(0, 1fr) minmax(0, min-content);
    grid-template-rows: repeat(2, minmax(0, min-content));
    grid-auto-flow: column dense;
    column-gap: 1rem;
    font-family: ${theme.typography.fontFamilies.lexendDeca};
    font-weight: 400;
    white-space: nowrap;

    ${addStylesForBreakpoints(
      css`
        grid-template-columns: minmax(0, 2.5rem) minmax(0, 1fr);
        grid-template-rows: repeat(3, minmax(0, min-content));
        row-gap: 0.5rem;
      `,
      'sm',
      'xs',
    )}
  `,
);

export const ContactListItemImageStyled = styled.span(
  ({ theme }) => css`
    border: 1px solid ${theme.palette.colors.grey[70]};
    border-radius: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    grid-row: span 2;

    ${addStylesForBreakpoints(
      css`
        grid-row: span 3;
      `,
      'sm',
      'xs',
    )}
  `,
);

export const ContactListItemPhoneStyled = styled.a(
  ({ theme }) => css`
    color: ${addTransparency(theme.palette.colors.white, 56)};
    font-size: 0.75rem;
    line-height: 1rem;
    grid-row-start: 2;
    text-decoration: none;
    justify-self: start;
  `,
);

export const ContactListItemActionsStyled = styled(motion.span)(
  () => css`
    grid-row: span 2;
    display: flex;
    column-gap: 0.5rem;
    align-items: center;

    @media (pointer: coarse) {
      opacity: 1 !important;
    }

    ${addStylesForBreakpoints(
      css`
        grid-row-start: 3;
        grid-column: span 2;
      `,
      'sm',
      'xs',
    )}

    ${addStylesForBreakpoints(
      css`
        justify-content: end;
      `,
      'sm',
    )}
    
    ${addStylesForBreakpoints(
      css`
        justify-content: space-between;
      `,
      'xs',
    )}
  `,
);
