import type { Meta, StoryObj } from '@storybook/nextjs';

import ContactDialog from './ContactDialog';
import { fn } from 'storybook/test';

const meta = {
  component: ContactDialog,
  parameters: { layout: 'centered' },
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof ContactDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Add: Story = {
  args: {
    mode: 'add',
  },
};

export const Edit: Story = {
  args: {
    mode: 'edit',
    name: 'Edit Elek',
    email: 'email@example.com',
    phoneNumber: '+123456789',
    profilePictureUrl: 'https://picsum.photos/256',
  },
};
