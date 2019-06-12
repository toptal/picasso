"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = __importDefault(require("color"));
// darken calculates based on the absolute color value
// https://github.com/Qix-/color/issues/53#issuecomment-487822576
exports.darken = (inputColor, amount) => {
    const colorValue = color_1.default(inputColor);
    const lightness = colorValue.lightness();
    return colorValue.lightness(lightness - lightness * amount).hex();
};
// lighten calculates based on the absolute color value
// https://github.com/Qix-/color/issues/53#issuecomment-487822576
exports.lighten = (inputColor, amount) => {
    const colorValue = color_1.default(inputColor);
    const lightness = colorValue.lightness();
    return colorValue.lightness(lightness + (100 - lightness) * amount).hex();
};
exports.alpha = (inputColor, amount) => {
    return color_1.default(inputColor)
        .alpha(amount)
        .toString();
};
exports.rem = (px, baseFontSize = 16) => {
    const pxNumber = px.replace('px', '');
    return `${Number.parseInt(pxNumber) / baseFontSize}rem`;
};
var withClasses_1 = require("./withClasses");
exports.withClasses = withClasses_1.default;
var createPropertiesStyles_1 = require("./createPropertiesStyles");
exports.createPropertiesStyles = createPropertiesStyles_1.createPropertiesStyles;
//# sourceMappingURL=index.js.map