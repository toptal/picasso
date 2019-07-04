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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const InputAdornment_1 = __importDefault(require("../InputAdornment"));
const OutlinedInput_1 = __importDefault(require("../OutlinedInput"));
const styles_2 = __importDefault(require("./styles"));
exports.TextField = (_a) => {
    var { id, name, value, placeholder, error, disabled, autoFocus, autoComplete, icon, iconPosition, classes, children, multiline, fullWidth, width, className, style, rows, rowsMax, type, onChange, inputProps } = _a, rest = __rest(_a, ["id", "name", "value", "placeholder", "error", "disabled", "autoFocus", "autoComplete", "icon", "iconPosition", "classes", "children", "multiline", "fullWidth", "width", "className", "style", "rows", "rowsMax", "type", "onChange", "inputProps"]);
    const IconAdornment = icon && (react_1.default.createElement(InputAdornment_1.default, { position: iconPosition, disabled: disabled }, icon));
    return (react_1.default.createElement(OutlinedInput_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, inputProps, { className: className, style: style, classes: {
            root: classnames_1.default(classes.root, {
                [classes.rootMultiline]: multiline
            }),
            input: classes.input
        }, id: id, name: name, value: value, placeholder: placeholder, error: error, disabled: disabled, autoFocus: autoFocus, autoComplete: autoComplete, multiline: multiline, rows: rows, rowsMax: rowsMax, type: type, width: fullWidth ? 'full' : width, 
        // html attributes
        inputProps: rest, endAdornment: iconPosition === 'end' && IconAdornment, startAdornment: iconPosition === 'start' && IconAdornment, onChange: onChange }), children));
};
exports.TextField.defaultProps = {
    iconPosition: 'start',
    multiline: false
};
exports.TextField.displayName = 'TextField';
exports.default = styles_1.withStyles(styles_2.default)(exports.TextField);
//# sourceMappingURL=TextField.js.map