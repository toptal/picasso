"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
exports.LabelGroup = ({ children, classes }) => (react_1.default.createElement("div", { className: classes.root }, children));
exports.LabelGroup.defaultProps = {
    children: undefined
};
exports.LabelGroup.displayName = 'LabelGroup';
exports.default = styles_1.withStyles(styles_2.default)(exports.LabelGroup);
//# sourceMappingURL=LabelGroup.js.map