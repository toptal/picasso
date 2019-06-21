"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const Tab_1 = __importDefault(require("@material-ui/core/Tab"));
const styles_2 = __importDefault(require("./styles"));
exports.Tab = ({ disabled, value, label, selected, onChange, onClick }) => (react_1.default.createElement(Tab_1.default, { disabled: disabled, label: label, value: value, selected: selected, onChange: onChange, onClick: onClick }));
exports.Tab.defaultProps = {};
exports.Tab.displayName = 'Tab';
exports.default = styles_1.withStyles(styles_2.default)(exports.Tab);
//# sourceMappingURL=Tab.js.map