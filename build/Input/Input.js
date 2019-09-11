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
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const InputAdornment_1 = __importDefault(require("../InputAdornment"));
const OutlinedInput_1 = __importDefault(require("../OutlinedInput"));
const styles_2 = __importDefault(require("./styles"));
exports.Input = react_1.forwardRef(function Input(_a, ref) {
    var { id, name, defaultValue, value, placeholder, error, disabled, autoFocus, autoComplete, icon, iconPosition, classes, children, multiline, width, className, style, rows, rowsMax, type, onChange, startAdornment, endAdornment } = _a, rest = __rest(_a, ["id", "name", "defaultValue", "value", "placeholder", "error", "disabled", "autoFocus", "autoComplete", "icon", "iconPosition", "classes", "children", "multiline", "width", "className", "style", "rows", "rowsMax", "type", "onChange", "startAdornment", "endAdornment"]);
    const IconAdornment = icon && (react_1.default.createElement(InputAdornment_1.default, { position: iconPosition, disabled: disabled }, icon));
    const usedStartAdornment = icon && iconPosition === 'start' ? IconAdornment : startAdornment;
    const usedEndAdornment = icon && iconPosition === 'end' ? IconAdornment : endAdornment;
    return (react_1.default.createElement(OutlinedInput_1.default, { ref: ref, className: className, style: style, classes: {
            root: classnames_1.default(classes.root, {
                [classes.rootMultiline]: multiline
            }),
            input: classes.input
        }, id: id, name: name, defaultValue: defaultValue, value: value, placeholder: placeholder, error: error, disabled: disabled, autoFocus: autoFocus, autoComplete: autoComplete, multiline: multiline, rows: rows, rowsMax: rowsMax, type: type, width: width, 
        // html attributes
        inputProps: rest, endAdornment: usedEndAdornment, startAdornment: usedStartAdornment, onChange: onChange }, children));
});
exports.Input.defaultProps = {
    iconPosition: 'start',
    multiline: false,
    width: 'auto'
};
exports.Input.displayName = 'Input';
exports.default = styles_1.withStyles(styles_2.default)(exports.Input);
//# sourceMappingURL=Input.js.map