"use strict";
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
exports.Typography = ({ variant, children, size, align, className, classes, style, inline, as, weight, color, invert }) => {
    const resolvedVariant = VARIANTS[variant][size];
    const variantClassName = kebab_to_camel_case_1.default(`${variant}-${size}`);
    const rootClass = classnames_1.default({
        [classes.invert]: invert
    }, classes[variantClassName], classes[weight], classes[color]);
    return (react_1.default.createElement(Typography_1.default, { align: align, className: className, classes: {
            root: rootClass
        }, style: style, variant: resolvedVariant, inline: inline, component: as }, children));
};
exports.Typography.defaultProps = {
    inline: false,
    size: 'inherit',
    variant: 'body'
};
exports.Typography.displayName = 'Typography';
exports.default = styles_1.withStyles(styles_2.default)(exports.Typography);
//# sourceMappingURL=Typography.js.map