"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Picasso_1 = require("../Picasso");
/**
 * Container component used for spacing 2 elements
 */
exports.Container = ({ children, className, top, bottom, left, right, padded, inline, flex, direction, alignItems, justifyContent, style }) => {
    const display = flex ? 'flex' : 'block';
    const inlineDisplay = flex ? 'inline-flex' : 'inline-block';
    const margins = Object.assign({}, (top && { marginTop: Picasso_1.spacingToEm(top) }), (bottom && { marginBottom: Picasso_1.spacingToEm(bottom) }), (left && { marginLeft: Picasso_1.spacingToEm(left) }), (right && { marginRight: Picasso_1.spacingToEm(right) }));
    return (react_1.default.createElement("div", { className: className, style: Object.assign({}, margins, (padded && { padding: Picasso_1.spacingToEm(padded) }), { display: inline ? inlineDisplay : display }, (direction && { flexDirection: direction }), (alignItems && { alignItems: alignItems }), (justifyContent && { justifyContent: justifyContent }), style) }, children));
};
exports.Container.defaultProps = {
    inline: false
};
exports.default = exports.Container;
//# sourceMappingURL=Container.js.map