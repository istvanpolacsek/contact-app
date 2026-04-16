import type { Meta, StoryObj } from '@storybook/nextjs';

import Popover from './Popover';
import { fn } from 'storybook/test';

const meta = {
  component: Popover,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actions: [
      { name: 'Add', icon: 'add', onClick: fn() },
      { name: 'Edit', icon: 'change', onClick: fn() },
      { name: 'Delete', icon: 'delete', onClick: fn() },
    ],
  },
};
