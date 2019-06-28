"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const Picasso_1 = require("../Picasso");
const styles_2 = __importDefault(require("./styles"));
/**
 * Container component used for spacing 2 elements
 */
exports.Container = ({ children, className, top, bottom, left, right, padded, inline, flex, direction, alignItems, justifyContent, style, bordered = false, classes }) => {
    const margins = Object.assign({}, (top && { marginTop: Picasso_1.spacingToEm(top) }), (bottom && { marginBottom: Picasso_1.spacingToEm(bottom) }), (left && { marginLeft: Picasso_1.spacingToEm(left) }), (right && { marginRight: Picasso_1.spacingToEm(right) }));
    return (react_1.default.createElement("div", { className: classnames_1.default({
            [classes[`${padded}Padding`]]: typeof padded === 'string',
            [classes.bordered]: bordered,
            [classes.flex]: flex,
            [classes.inline]: inline
        }, className), style: Object.assign({}, margins, (direction && { flexDirection: direction }), (alignItems && { alignItems }), (justifyContent && { justifyContent }), (typeof padded === 'number' && { padding: Picasso_1.spacingToEm(padded) }), style) }, children));
};
exports.Container.defaultProps = {
    inline: false
};
exports.default = styles_1.withStyles(styles_2.default)(exports.Container);
//# sourceMappingURL=Container.js.map