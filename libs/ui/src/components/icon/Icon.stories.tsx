import type { Meta, StoryObj } from '@storybook/nextjs';

import Icon from './Icon';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { keys, map, startCase } from 'lodash';
import { ICONS, type IconVariants } from './constants';

const IconDictionaryContainer = styled.div(
  () => css`
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
    color: ${theme.palette.colors.white};
  `,
);

const IconDictionaryElementName = styled.span(
  ({ theme }) => css`
    font-family: ${theme.typography.fontFamilies.lexendDeca};
    font-weight: 500;
  `,
);

const meta = {
  component: Icon,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IconDictionary: Story = {
  args: { icon: 'add' },
  render: () => (
    <IconDictionaryContainer>
      {map(keys(ICONS), (icon, i) => (
        <IconDictionaryElement key={i}>
          <Icon icon={icon as IconVariants} width={48} height={48} />
          <IconDictionaryElementName>
            {startCase(icon)}
          </IconDictionaryElementName>
        </IconDictionaryElement>
      ))}
    </IconDictionaryContainer>
  ),
};
