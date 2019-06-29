"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const Icon_1 = require("../Icon");
const styles_2 = __importDefault(require("./styles"));
exports.StepConnector = ({ classes }) => {
    return react_1.default.createElement(Icon_1.ChevronRight16, { className: classes.connectorIcon });
};
exports.StepConnector.displayName = 'StepConnector';
exports.default = styles_1.withStyles(styles_2.default)(exports.StepConnector);
//# sourceMappingURL=StepConnector.js.map