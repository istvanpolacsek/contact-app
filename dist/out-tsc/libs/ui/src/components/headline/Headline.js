import { jsx as _jsx } from "react/jsx-runtime";
import { HeadlineStyled } from './Headline.styles';
const Headline = ({ level = 2, children, }) => _jsx(HeadlineStyled, { as: `h${level}`, children: children });
export default Headline;
//# sourceMappingURL=Headline.js.map