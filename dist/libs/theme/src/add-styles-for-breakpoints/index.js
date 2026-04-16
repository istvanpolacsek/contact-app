"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _lodash = require("lodash");
const _react = require("@emotion/react");
const _theme = require("../emotion-cache/theme");
function addStylesForBreakpoints(styles, ...forBreakpoints) {
    return (0, _react.css)`
    ${(0, _lodash.map)(forBreakpoints, (breakpoint)=>{
        const [from, to] = _theme.BREAKPOINT_DICTIONARY[breakpoint];
        switch(breakpoint){
            case 'xs':
                return (0, _react.css)`
            @media screen and (max-width: ${to}px) {
              ${styles};
            }
          `;
            case 'xl':
                return (0, _react.css)`
            @media screen and (min-width: ${from}px) {
              ${styles};
            }
          `;
            default:
                return (0, _react.css)`
            @media screen and (min-width: ${from}px) and (max-width: ${to}px) {
              ${styles};
            }
          `;
        }
    })}
  `;
}
const _default = addStylesForBreakpoints;

//# sourceMappingURL=index.js.map