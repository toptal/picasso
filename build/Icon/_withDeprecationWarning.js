"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const withDeprecationWarning = (oldName, newName) => (NewIcon) => {
    const newIconComponent = (props) => {
        react_1.default.useEffect(() => {
            if (!newName) {
                window.console.warn(`'${oldName}' icon is deprecated and will be removed in the next major release of Picasso. Please contact your designer to provide you a correct icon.`);
            }
            else {
                window.console.warn(`'${oldName}' icon is deprecated and will be removed in the next major release of Picasso. Please use '${newName}' directly to maintain pixel perfect icons.`);
            }
        }, []);
        // eslint-disable-next-line react/jsx-props-no-spreading
        return react_1.default.createElement(NewIcon, Object.assign({}, props));
    };
    return newIconComponent;
};
withDeprecationWarning.displayName = 'withDepractionWarning';
exports.default = withDeprecationWarning;
//# sourceMappingURL=_withDeprecationWarning.js.map