"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const Close_1 = __importDefault(require("@material-ui/icons/Close"));
const Chip_1 = __importDefault(require("../Chip"));
const LabelGroup_1 = __importDefault(require("../LabelGroup"));
const styles_2 = __importDefault(require("./styles"));
exports.Label = ({ classes, children, className, icon, style, onDelete, onBlur, onFocus, onMouseLeave, onMouseOver, onTouchEnd, onTouchStart }) => {
    return (react_1.default.createElement(Chip_1.default, { className: className, style: style, deleteIcon: react_1.default.createElement(Close_1.default, { "aria-label": 'delete icon', className: classes.deleteIcon, role: 'button' }), onDelete: onDelete, label: children, icon: icon, onBlur: onBlur, onFocus: onFocus, onMouseLeave: onMouseLeave, onMouseOver: onMouseOver, onTouchEnd: onTouchEnd, onTouchStart: onTouchStart }));
};
exports.Label.defaultProps = {
    children: '',
    onDelete: undefined
};
exports.Label.displayName = 'Label';
exports.Label.Group = LabelGroup_1.default;
exports.default = styles_1.withStyles(styles_2.default)(exports.Label);
//# sourceMappingURL=Label.js.map