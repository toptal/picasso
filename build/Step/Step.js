"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const Step_1 = __importDefault(require("@material-ui/core/Step"));
const styles_2 = __importDefault(require("./styles"));
exports.Step = props => {
    const { active, children, completed, index } = props;
    return (react_1.default.createElement(Step_1.default, { active: active, completed: completed, index: index }, children));
};
exports.Step.displayName = 'Step';
exports.default = styles_1.withStyles(styles_2.default)(exports.Step);
//# sourceMappingURL=Step.js.map