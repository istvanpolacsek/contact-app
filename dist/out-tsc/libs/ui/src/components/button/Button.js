import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from '..';
import { ButtonStyled } from './Button.styles';
const Button = ({ icon, variant = 'primary', children, ...rest }) => (_jsxs(ButtonStyled, { "$variant": variant, ...rest, children: [icon ? _jsx(Icon, { icon: icon }) : null, children] }));
export default Button;
//# sourceMappingURL=Button.js.map