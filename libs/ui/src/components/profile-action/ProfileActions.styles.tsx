import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const ProfileActionsStyled = styled.span(
  ({ theme }) => css`
    border: 1px solid ${theme.palette.colors.white};
    border-radius: 100%;
    overflow: hidden;
    width: 1.25rem;
    height: 1.25rem;
  `,
);
