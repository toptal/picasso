"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const Button_1 = __importDefault(require("../Button"));
const styles_2 = require("../styles");
const styles_3 = __importDefault(require("./styles"));
exports.ButtonGroup = ({ children, classes, className, style }) => (react_1.default.createElement("div", { className: classnames_1.default(classes.root, className), style: style }, children));
exports.ButtonGroup.defaultProps = {
    classes: {}
};
exports.ButtonGroup.displayName = 'ButtonGroup';
exports.default = styles_1.withStyles(styles_3.default)(styles_2.withClasses(classes => [
    [
        Button_1.default,
        {
            root: classes.button,
            active: classes.active
        }
    ]
])(exports.ButtonGroup));
//# sourceMappingURL=ButtonGroup.js.map