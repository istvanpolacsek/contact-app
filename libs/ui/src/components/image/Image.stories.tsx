import type { Meta, StoryObj } from '@storybook/nextjs';

import Image from './Image';

const meta = {
  component: Image,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'src',
    alt: 'alt',
  },
};
