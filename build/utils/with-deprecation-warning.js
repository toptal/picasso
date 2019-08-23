"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const withDeprecationWarning = (oldName, newName) => function withDeprecationWarningInner(NewComponent) {
    const newComponent = (props) => {
        react_1.default.useEffect(() => {
            window.console.warn(`
'${oldName}' component is deprecated and will be
removed in the next major release of Picasso.
Please use '${newName}' instead.
          `.trim());
        }, []);
        // eslint-disable-next-line react/jsx-props-no-spreading
        return react_1.default.createElement(NewComponent, Object.assign({}, props));
    };
    return newComponent;
};
withDeprecationWarning.displayName = 'withDepractionWarning';
exports.default = withDeprecationWarning;
//# sourceMappingURL=with-deprecation-warning.js.map