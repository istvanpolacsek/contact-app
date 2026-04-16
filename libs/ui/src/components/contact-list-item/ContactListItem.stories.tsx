import type { Meta, StoryObj } from '@storybook/nextjs';

import ContactListItem from './ContactListItem';

const meta = {
  component: ContactListItem,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ContactListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Jonas Jones',
    phoneNumber: '+36 01 234 5678',
  },
};
