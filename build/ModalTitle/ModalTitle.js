"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const Typography_1 = __importDefault(require("../Typography"));
const styles_2 = __importDefault(require("./styles"));
exports.ModalTitle = ({ children, classes, className, style }) => (react_1.default.createElement("div", { className: classnames_1.default(classes.root, className), style: style },
    react_1.default.createElement(Typography_1.default, { variant: 'heading', size: 'medium' }, children)));
exports.ModalTitle.displayName = 'ModalTitle';
exports.default = styles_1.withStyles(styles_2.default)(exports.ModalTitle);
//# sourceMappingURL=ModalTitle.js.map