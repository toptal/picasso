"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const Chip_1 = __importDefault(require("@material-ui/core/Chip"));
const styles_2 = __importDefault(require("./styles"));
const Chip = ({ classes, className, style, deleteIcon, icon, label, onDelete, onBlur, onFocus, onMouseLeave, onMouseOver, onTouchEnd, onTouchStart }) => (react_1.default.createElement(Chip_1.default, { classes: classes, className: className, style: style, icon: icon, label: react_1.default.createElement("span", { className: classes.innerLabel }, label), deleteIcon: deleteIcon, onDelete: onDelete, onBlur: onBlur, onFocus: onFocus, onMouseLeave: onMouseLeave, onMouseOver: onMouseOver, onTouchEnd: onTouchEnd, onTouchStart: onTouchStart }));
exports.default = styles_1.withStyles(styles_2.default)(Chip);
//# sourceMappingURL=Chip.js.map