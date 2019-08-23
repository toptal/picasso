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
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const Picasso_1 = require("../Picasso");
const styles_2 = __importDefault(require("./styles"));
/**
 * Container component used for spacing 2 elements
 */
exports.Container = react_1.forwardRef(function Container(_a, ref) {
    var { children, className, top, bottom, left, right, padded, inline, flex, direction, alignItems, justifyContent, style, bordered = false, variant, classes, as: Component = inline ? 'span' : 'div' } = _a, rest = __rest(_a, ["children", "className", "top", "bottom", "left", "right", "padded", "inline", "flex", "direction", "alignItems", "justifyContent", "style", "bordered", "variant", "classes", "as"]);
    const margins = Object.assign({}, (top && { marginTop: Picasso_1.spacingToEm(top) }), (bottom && { marginBottom: Picasso_1.spacingToEm(bottom) }), (left && { marginLeft: Picasso_1.spacingToEm(left) }), (right && { marginRight: Picasso_1.spacingToEm(right) }));
    return (react_1.default.createElement(Component
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, className: classnames_1.default(classes[`${variant}Variant`], {
            [classes[`${padded}Padding`]]: typeof padded === 'string',
            [classes.bordered]: bordered,
            [classes.flex]: flex,
            [classes.inline]: inline,
            [classes.column]: direction === 'column'
        }, className), style: Object.assign({}, margins, (alignItems && { alignItems }), (justifyContent && { justifyContent }), (typeof padded === 'number' && { padding: Picasso_1.spacingToEm(padded) }), style) }), children));
});
exports.Container.displayName = 'Container';
exports.Container.defaultProps = {
    as: 'div',
    inline: false
};
exports.default = styles_1.withStyles(styles_2.default)(exports.Container);
//# sourceMappingURL=Container.js.map