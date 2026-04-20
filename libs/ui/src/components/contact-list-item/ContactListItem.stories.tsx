import type { Meta, StoryObj } from '@storybook/nextjs';

import ContactListItem, { type ContactListItemProps } from './ContactListItem';
import { fn } from 'storybook/test';

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
    onDeleteContact: fn(),
  } as unknown as ContactListItemProps,
};
