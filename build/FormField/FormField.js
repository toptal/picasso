"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const FormHint_1 = __importDefault(require("../FormHint"));
const FormError_1 = __importDefault(require("../FormError"));
const styles_2 = __importDefault(require("./styles"));
exports.FormField = react_1.forwardRef(function FormField(_a, ref) {
    var { classes, className, style, hint, children, error } = _a, rest = __rest(_a, ["classes", "className", "style", "hint", "children", "error"]);
    return (react_1.default.createElement("div", Object.assign({}, rest, { ref: ref, className: classnames_1.default(classes.root, className), style: style }),
        children,
        error && react_1.default.createElement(FormError_1.default, { className: classes.error }, error),
        hint && react_1.default.createElement(FormHint_1.default, { className: classes.hint }, hint)));
});
exports.FormField.defaultProps = {};
exports.FormField.displayName = 'FormField';
exports.default = styles_1.withStyles(styles_2.default)(exports.FormField);
//# sourceMappingURL=FormField.js.map