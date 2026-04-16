import Headline from './Headline';
const meta = {
    component: Headline,
    args: { children: 'some headline' },
    parameters: { layout: 'centered' },
};
export default meta;
export const AsH1 = {
    args: {
        level: 1,
    },
};
export const AsH2 = {
    args: {},
};
export const AsH3 = {
    args: {
        level: 3,
    },
};
//# sourceMappingURL=Headline.stories.js.map