"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FormField_1 = __importDefault(require("../FormField"));
const FormHint_1 = __importDefault(require("../FormHint"));
const FormLabel_1 = __importDefault(require("../FormLabel"));
const FormError_1 = __importDefault(require("../FormError"));
exports.Form = ({ onSubmit, className, style, children }) => (react_1.default.createElement("form", { onSubmit: onSubmit, className: className, style: style }, children));
exports.Form.Field = FormField_1.default;
exports.Form.Hint = FormHint_1.default;
exports.Form.Label = FormLabel_1.default;
exports.Form.Error = FormError_1.default;
exports.Form.displayName = 'Form';
exports.default = exports.Form;
//# sourceMappingURL=Form.js.map