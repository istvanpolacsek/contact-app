import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from './Icon';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { keys, map, startCase } from 'lodash';
import { ICONS } from './constants';
const IconDictionaryContainer = styled.div(() => css `
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 2rem;
  `);
const IconDictionaryElement = styled.div(({ theme }) => css `
    display: grid;
    place-items: center;
    row-gap: 1rem;
    color: ${theme.palette.colors.white};
  `);
const IconDictionaryElementName = styled.span(({ theme }) => css `
    font-family: ${theme.typography.fontFamilies.lexendDeca};
    font-weight: 500;
  `);
const meta = {
    component: Icon,
    parameters: { layout: 'centered' },
};
export default meta;
export const IconDictionary = {
    args: { icon: 'add' },
    render: () => (_jsx(IconDictionaryContainer, { children: map(keys(ICONS), (icon, i) => (_jsxs(IconDictionaryElement, { children: [_jsx(Icon, { icon: icon, width: 48, height: 48 }), _jsx(IconDictionaryElementName, { children: startCase(icon) })] }, i))) })),
};
//# sourceMappingURL=Icon.stories.js.map