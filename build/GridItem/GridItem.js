"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const styles_2 = __importDefault(require("./styles"));
exports.GridItem = ({ children, small, medium, large, classes, className, style }) => (react_1.default.createElement(Grid_1.default, { item: true, lg: large, md: medium, xs: small, classes: classes, className: className, style: style }, children));
exports.GridItem.defaultProps = {};
exports.default = styles_1.withStyles(styles_2.default)(exports.GridItem);
//# sourceMappingURL=GridItem.js.map