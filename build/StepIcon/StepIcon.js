"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const Icon_1 = require("../Icon");
const styles_2 = __importDefault(require("./styles"));
exports.StepIcon = ({ active, completed, classes }) => {
    return (react_1.default.createElement("div", { className: classnames_1.default(classes.root, {
            [classes.active]: active,
            [classes.completed]: completed
        }) }, completed && react_1.default.createElement(Icon_1.CheckMinor24, null)));
};
exports.StepIcon.displayName = 'StepIcon';
exports.default = styles_1.withStyles(styles_2.default)(exports.StepIcon);
//# sourceMappingURL=StepIcon.js.map