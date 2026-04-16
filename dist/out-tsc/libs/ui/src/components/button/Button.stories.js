import Button from './Button';
const meta = {
    component: Button,
    parameters: { layout: 'centered' },
};
export default meta;
export const Primary = {
    args: {
        children: 'some text',
    },
};
export const Secondary = {
    args: {
        children: 'some text',
        variant: 'secondary',
    },
};
export const Special = {
    args: {
        children: 'some text',
        variant: 'special',
    },
};
export const PrimaryWithIcon = {
    args: {
        icon: 'backArrow',
        children: 'go back',
    },
};
export const SecondaryWithIconWithIcon = {
    args: {
        icon: 'mute',
        children: 'Mute',
        variant: 'secondary',
    },
};
export const SpecialWithIcon = {
    args: {
        icon: 'settings',
        children: 'Settings',
        variant: 'special',
    },
};
//# sourceMappingURL=Button.stories.js.map