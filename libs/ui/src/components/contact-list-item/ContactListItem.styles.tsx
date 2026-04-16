import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion } from 'motion/react';
import { addTransparency } from '@contact-app/theme';

export const ContactListItemStyled = styled(motion.li)(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: minmax(0, 2.5rem) minmax(0, 1fr) minmax(
        0,
        min-content
      );
    grid-template-rows: repeat(2, minmax(0, min-content));
    grid-auto-flow: column dense;
    column-gap: 1rem;
    font-family: ${theme.typography.fontFamilies.lexendDeca};
    font-weight: 400;
  `,
);

export const ContactListItemImageStyled = styled.span(
  ({ theme }) => css`
    border: 1px solid ${theme.palette.colors.grey[70]};
    border-radius: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    grid-row: span 2;
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
  ({ theme }) => css`
    grid-row: span 2;
    display: flex;
    column-gap: 0.5rem;
  `,
);
