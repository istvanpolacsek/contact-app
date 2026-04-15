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
const _react = require("@emotion/react");
function addHoverEffect(style) {
    return (0, _react.css)`
    @media screen and (hover: hover) {
      ${style};
    }
  `;
}
const _default = addHoverEffect;

//# sourceMappingURL=index.js.map