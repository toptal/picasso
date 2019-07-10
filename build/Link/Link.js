"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Link_1 = __importDefault(require("@material-ui/core/Link"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const styles_2 = __importDefault(require("./styles"));
exports.Link = (_a) => {
    var { href, underline, onClick, children, classes, className, style, as, variant, tabIndex, invert } = _a, rest = __rest(_a, ["href", "underline", "onClick", "children", "classes", "className", "style", "as", "variant", "tabIndex", "invert"]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { color } = rest, nativeHTMLAttributes = __rest(rest, ["color"]);
    return (react_1.default.createElement(Link_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, nativeHTMLAttributes, { href: href, underline: underline, onClick: onClick, className: classnames_1.default(classes.root, className, {
            [classes.action]: variant === 'action',
            [classes.invert]: invert
        }), style: style, component: as, tabIndex: tabIndex }), children));
};
exports.Link.defaultProps = {
    as: 'a',
    variant: 'default'
};
exports.Link.displayName = 'Link';
exports.default = styles_1.withStyles(styles_2.default)(exports.Link);
//# sourceMappingURL=Link.js.map