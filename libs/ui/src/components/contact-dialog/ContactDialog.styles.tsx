import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const ContactDialogStyled = styled.form(
  ({ theme }) => css`
    display: grid;
    row-gap: 1.5rem;
    padding-inline: 1.5rem;
    padding-block: 1.5rem;
    background-color: ${theme.palette.colors.grey[100]};
    border-radius: 0.5rem;
  `,
);

export const ContactDialogActionsStyled = styled.div(
  ({ theme }) => css`
    display: flex;
    padding-block: 1.5rem 0;
    column-gap: 0.5rem;
    align-items: center;
    justify-content: end;
  `,
);
