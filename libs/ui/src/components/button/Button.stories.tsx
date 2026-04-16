import type { Meta, StoryObj } from '@storybook/nextjs';

import Button from './Button';

const meta = {
  component: Button,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'some text',
  },
};

export const Secondary: Story = {
  args: {
    children: 'some text',
    variant: 'secondary',
  },
};

export const Special: Story = {
  args: {
    children: 'some text',
    variant: 'special',
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    icon: 'backArrow',
    children: 'go back',
  },
};

export const SecondaryWithIconWithIcon: Story = {
  args: {
    icon: 'mute',
    children: 'Mute',
    variant: 'secondary',
  },
};

export const SpecialWithIcon: Story = {
  args: {
    icon: 'settings',
    children: 'Settings',
    variant: 'special',
  },
};
