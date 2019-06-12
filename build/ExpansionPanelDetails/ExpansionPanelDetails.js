"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const ExpansionPanelDetails_1 = __importDefault(require("@material-ui/core/ExpansionPanelDetails"));
const styles_2 = __importDefault(require("./styles"));
const ExpansionPanelDetails = ({ classes, children }) => (react_1.default.createElement(ExpansionPanelDetails_1.default, { classes: classes }, children));
exports.default = styles_1.withStyles(styles_2.default)(ExpansionPanelDetails);
//# sourceMappingURL=ExpansionPanelDetails.js.map