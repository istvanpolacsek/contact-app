import type { Meta, StoryObj } from '@storybook/nextjs';

import Backdrop from './Backdrop';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const BackdropChildrenStyled = styled.div(
  ({ theme }) => css`
    background-color: ${theme.palette.colors.white};
    width: 15rem;
    height: 20rem;
    border-radius: 1rem;
    overflow: hidden;
    padding: 1rem;
    display: grid;
    place-items: center;
    font-family: ${theme.typography.fontFamilies.lexendDeca};
  `,
);

const meta = {
  component: Backdrop,
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
} satisfies Meta<typeof Backdrop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isVisible: true,
    children: <BackdropChildrenStyled>Backdrop child</BackdropChildrenStyled>,
  },
};
