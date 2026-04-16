import { jsx as _jsx } from "react/jsx-runtime";
import { ICONS } from './constants';
const Icon = ({ icon, ...rest }) => {
    const IconComponent = ICONS[icon];
    return _jsx(IconComponent, { ...rest });
};
export default Icon;
//# sourceMappingURL=Icon.js.map