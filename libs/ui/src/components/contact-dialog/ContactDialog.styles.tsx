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
    min-width: 22.75rem;
  `,
);

export const ContactDialogActionsStyled = styled.div(
  () => css`
    display: flex;
    padding-block: 1.5rem 0;
    column-gap: 0.5rem;
    align-items: center;
    justify-content: end;
  `,
);

export const ContactDialogPhotoEditStyled = styled.div(
  () => css`
    display: flex;
    align-items: center;
    column-gap: 1rem;
  `,
);

export const ContactDialogPhotoInputStyled = styled.input(
  () => css`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    white-space: nowrap;
  `,
);

export const ContactDialogPhotoActionsStyled = styled.div(
  () => css`
    display: flex;
    column-gap: 0.5rem;
  `,
);

export const ContactDialogPhotoWrapperStyled = styled.div(
  () => css`
    max-width: 5.5rem;
    max-height: 5.5rem;
    border-radius: 100%;
    overflow: hidden;
  `,
);
