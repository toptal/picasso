"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const styles_2 = __importDefault(require("./styles"));
const Typography_1 = __importDefault(require("../Typography"));
exports.FormError = ({ children, classes, className, style }) => {
    return (react_1.default.createElement("div", { className: classnames_1.default(classes.root, className), style: style },
        react_1.default.createElement(Typography_1.default, { className: classes.error }, children)));
};
exports.FormError.displayName = 'FormError';
exports.default = styles_1.withStyles(styles_2.default)(exports.FormError);
//# sourceMappingURL=FormError.js.map