"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const styles_2 = __importDefault(require("./styles"));
exports.ModalActions = ({ children, classes, className, style }) => (react_1.default.createElement("div", { className: classnames_1.default(classes.root, className), style: style }, children));
exports.ModalActions.displayName = 'ModalActions';
exports.default = styles_1.withStyles(styles_2.default)(exports.ModalActions);
//# sourceMappingURL=ModalActions.js.map