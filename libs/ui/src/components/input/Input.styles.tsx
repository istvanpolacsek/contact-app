import styled from '@emotion/styled';
import { motion } from 'motion/react';
import { css } from '@emotion/react';
import { addTransparency } from '@contact-app/theme';

export const InputContainerStyled = styled.div(
  ({ theme }) => css`
    display: grid;
    row-gap: 0.25rem;
    font-family: ${theme.typography.fontFamilies.lexendDeca};
  `,
);

export const InputStyled = styled(motion.input)(
  ({ theme }) => css`
    box-sizing: content-box;
    border-radius: 0.5rem;
    border: 1px solid;
    font-size: 0.875rem;
    line-height: 100%;
    padding-inline: 0.75rem;
    padding-block: 0.625rem;
    color: ${theme.palette.colors.white};
    outline: none;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  `,
);

export const InputLabelStyled = styled.label(
  ({ theme }) => css`
    font-weight: 400;
    line-height: 1rem;
    font-size: 0.75rem;
    color: ${addTransparency(theme.palette.colors.white, 32)};
  `,
);
