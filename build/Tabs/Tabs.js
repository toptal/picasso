"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const Tabs_1 = __importDefault(require("@material-ui/core/Tabs"));
const Tab_1 = __importDefault(require("../Tab"));
const styles_2 = __importDefault(require("./styles"));
exports.Tabs = ({ children, onChange, value }) => (react_1.default.createElement(Tabs_1.default, { onChange: onChange, value: value }, children));
exports.Tabs.defaultProps = {};
exports.Tabs.displayName = 'Tabs';
exports.Tabs.Tab = Tab_1.default;
exports.default = styles_1.withStyles(styles_2.default)(exports.Tabs);
//# sourceMappingURL=Tabs.js.map