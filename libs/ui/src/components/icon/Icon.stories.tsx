import type { Meta, StoryObj } from '@storybook/nextjs';

import Icon from './Icon';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { keys, map } from 'lodash';
import { ICONS } from './constants';

const IconDictionaryContainer = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 2rem;
  `,
);

const IconDictionaryElement = styled.div(
  ({ theme }) => css`
    display: grid;
    place-items: center;
    row-gap: 1rem;
    color: ${theme.palette.colors.grey[10]};
  `,
);

const IconDictionaryElementName = styled.span(
  ({ theme }) => css`
    text-transform: capitalize;
  `,
);

const meta = {
  component: Icon,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'add',
  },
};

export const IconDictionary: Story = {
  args: { icon: 'add' },
  render: () => {
    return (
      <IconDictionaryContainer>
        {map(keys(ICONS), (icon, i) => (
          <IconDictionaryElement key={i}>
            <Icon icon={icon as keyof typeof ICONS} width={48} height={48} />
            <IconDictionaryElementName>{icon}</IconDictionaryElementName>
          </IconDictionaryElement>
        ))}
      </IconDictionaryContainer>
    );
  },
};
