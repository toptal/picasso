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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Link_1 = __importDefault(require("@material-ui/core/Link"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/styles");
const styles_2 = __importDefault(require("./styles"));
const useStyles = styles_1.makeStyles(styles_2.default);
exports.Link = react_1.forwardRef(function Link(props, ref) {
    const { href, underline, onClick, children, className, color, style, as, variant, tabIndex, invert } = props, rest = __rest(props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    , ["href", "underline", "onClick", "children", "className", "color", "style", "as", "variant", "tabIndex", "invert"]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const nativeHTMLAttributes = __rest(rest, []);
    const classes = useStyles(props);
    let fontColor = color;
    if (invert) {
        fontColor = 'white';
        // eslint-disable-next-line no-console
        console.log('Please stop using `invert` it will be removed in next major release. Use color=white instead.');
    }
    return (react_1.default.createElement(Link_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, nativeHTMLAttributes, { ref: ref, href: href, underline: underline, onClick: onClick, className: classnames_1.default(classes.root, className, {
            [classes.action]: variant === 'action',
            [classes.white]: fontColor === 'white',
            [classes.black]: fontColor === 'black'
        }), style: style, component: as, tabIndex: tabIndex }), children));
});
exports.Link.defaultProps = {
    as: 'a',
    color: 'blue',
    variant: 'default'
};
exports.Link.displayName = 'Link';
exports.default = exports.Link;
//# sourceMappingURL=Link.js.map