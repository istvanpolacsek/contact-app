import type { Meta, StoryObj } from '@storybook/nextjs';

import Input from './Input';

const meta = {
  component: Input,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Some label',
    placeholder: 'Enter text',
  },
};
