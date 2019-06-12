"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
exports.Image = ({ src, srcSet, alt, classes, className, variant, style }) => (react_1.default.createElement("img", { src: src, srcSet: srcSet, alt: alt, className: classnames_1.default({
        [classes.circular]: variant === 'circular'
    }, classes.root, className), style: style }));
exports.Image.defaultProps = {
    variant: 'default'
};
exports.Image.displayName = 'Image';
exports.default = styles_1.withStyles(styles_2.default)(exports.Image);
//# sourceMappingURL=Image.js.map