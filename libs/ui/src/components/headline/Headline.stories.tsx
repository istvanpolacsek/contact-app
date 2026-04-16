import type { Meta, StoryObj } from '@storybook/nextjs';

import Headline from './Headline';

const meta = {
  component: Headline,
  args: { children: 'some headline' },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Headline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AsH1: Story = {
  args: {
    level: 1,
  },
};

export const AsH2: Story = {
  args: {},
};

export const AsH3: Story = {
  args: {
    level: 3,
  },
};
