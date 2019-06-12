"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const styles_2 = __importDefault(require("./styles"));
const CssBaseline = ({ children }) => (react_1.default.createElement(CssBaseline_1.default, null, children));
exports.default = styles_1.withStyles(styles_2.default)(CssBaseline);
//# sourceMappingURL=CssBaseline.js.map