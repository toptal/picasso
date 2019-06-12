"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const Typography_1 = __importDefault(require("../Typography"));
const styles_2 = __importDefault(require("./styles"));
exports.MenuItem = ({ as, children, classes, className, disabled, disableGutters, onClick, style, value }) => {
    if (typeof children === 'string' || children instanceof String) {
        children = (react_1.default.createElement(Typography_1.default, { className: classes.stringContent, style: style, color: 'black' }, children));
    }
    return (react_1.default.createElement(MenuItem_1.default, { component: as, className: className, disabled: disabled, disableGutters: disableGutters, onClick: onClick, style: style, value: value }, children));
};
exports.MenuItem.defaultProps = {
    as: 'li',
    onClick: () => { }
};
exports.MenuItem.displayName = 'MenuItem';
exports.default = styles_1.withStyles(styles_2.default)(exports.MenuItem);
//# sourceMappingURL=MenuItem.js.map