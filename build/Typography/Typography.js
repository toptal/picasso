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
const styles_1 = require("@material-ui/core/styles");
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const classnames_1 = __importDefault(require("classnames"));
const kebab_to_camel_case_1 = __importDefault(require("../utils/kebab-to-camel-case"));
const styles_2 = __importDefault(require("./styles"));
const VARIANTS = {
    heading: {
        small: 'h4',
        medium: 'h3',
        large: 'h2',
        xlarge: 'h1'
    },
    body: {
        small: 'body1',
        medium: 'body1',
        large: 'body1',
        inherit: 'body1'
    }
};
exports.Typography = (_a) => {
    var { variant, children, size, align, className, classes, style, inline, as, weight, color, invert } = _a, rest = __rest(_a, ["variant", "children", "size", "align", "className", "classes", "style", "inline", "as", "weight", "color", "invert"]);
    const resolvedVariant = VARIANTS[variant][size];
    const variantClassName = kebab_to_camel_case_1.default(`${variant}-${size}`);
    const colorClassName = kebab_to_camel_case_1.default(`${color}`);
    const rootClass = classnames_1.default({
        [classes.invert]: invert
    }, classes[variantClassName], classes[weight], classes[colorClassName]);
    return (react_1.default.createElement(Typography_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { align: align, className: className, classes: {
            root: rootClass
        }, style: style, variant: resolvedVariant, inline: inline, component: as }), children));
};
exports.Typography.defaultProps = {
    inline: false,
    size: 'inherit',
    variant: 'body'
};
exports.Typography.displayName = 'Typography';
exports.default = styles_1.withStyles(styles_2.default)(exports.Typography);
//# sourceMappingURL=Typography.js.map