"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Link_1 = __importDefault(require("@material-ui/core/Link"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const styles_2 = __importDefault(require("./styles"));
exports.Link = ({ href, underline, onClick, children, classes, className, style, as, variant, tabIndex, onBlur, onFocus, onMouseLeave, onMouseOver, onTouchEnd, onTouchStart }) => {
    return (react_1.default.createElement(Link_1.default, { href: href, underline: underline, onClick: onClick, className: classnames_1.default(classes.root, className, {
            [classes.action]: variant === 'action'
        }), style: style, component: as, tabIndex: tabIndex, onBlur: onBlur, onFocus: onFocus, onMouseLeave: onMouseLeave, onMouseOver: onMouseOver, onTouchEnd: onTouchEnd, onTouchStart: onTouchStart }, children));
};
exports.Link.defaultProps = {
    as: 'a',
    variant: 'default'
};
exports.Link.displayName = 'Link';
exports.default = styles_1.withStyles(styles_2.default)(exports.Link);
//# sourceMappingURL=Link.js.map