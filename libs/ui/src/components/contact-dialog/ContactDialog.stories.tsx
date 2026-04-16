import type { Meta, StoryObj } from '@storybook/nextjs';

import ContactDialog from './ContactDialog';

const meta = {
  component: ContactDialog,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ContactDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
