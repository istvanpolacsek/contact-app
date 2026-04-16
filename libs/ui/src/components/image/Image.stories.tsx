import type { Meta, StoryObj } from '@storybook/nextjs';

import Image from './Image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const ImageDecorator = styled.div(
  () => css`
    width: 10rem;
    height: 10rem;
  `,
);

const meta = {
  component: Image,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <ImageDecorator>{Story()}</ImageDecorator>],
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/256',
    alt: 'alt',
  },
};

export const Placeholder: Story = {
  args: {
    src: 'bad-url',
    alt: 'alt',
  },
};
