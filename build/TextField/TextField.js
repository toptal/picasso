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
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const styles_1 = require("@material-ui/core/styles");
const InputAdornment_1 = __importDefault(require("../InputAdornment"));
const styles_2 = __importDefault(require("./styles"));
exports.TextField = (_a) => {
    var { id, name, value, placeholder, error, disabled, autoFocus, autoComplete, icon, iconPosition, inputProps = {}, classes, children, multiline, fullWidth, className, style, rows, rowsMax, type, onChange } = _a, rest = __rest(_a, ["id", "name", "value", "placeholder", "error", "disabled", "autoFocus", "autoComplete", "icon", "iconPosition", "inputProps", "classes", "children", "multiline", "fullWidth", "className", "style", "rows", "rowsMax", "type", "onChange"]);
    if (icon) {
        const IconAdornment = (react_1.default.createElement(InputAdornment_1.default, { className: classnames_1.default(classes.icon, iconPosition === 'end' ? classes.iconEnd : classes.iconStart), position: iconPosition }, icon));
        inputProps.notched = false;
        if (iconPosition === 'end') {
            inputProps.endAdornment = IconAdornment;
        }
        else {
            inputProps.startAdornment = IconAdornment;
        }
    }
    return (react_1.default.createElement(TextField_1.default, { id: id, name: name, value: value, placeholder: placeholder, error: error, disabled: disabled, autoFocus: autoFocus, autoComplete: autoComplete, multiline: multiline, variant: 'outlined', style: style, rows: rows, rowsMax: rowsMax, type: type, className: classnames_1.default(classes.rootFixedWidth, className, {
            [classes.rootFullWidth]: fullWidth
        }), 
        // html attributes
        inputProps: rest, 
        // props that are not html attributes
        InputProps: Object.assign({}, inputProps, { classes: {
                root: classnames_1.default(classes.root, {
                    [classes.rootMultiline]: multiline
                }),
                input: classes.input,
                inputMultiline: classes.inputMultiline
            } }), onChange: onChange }, children));
};
exports.TextField.defaultProps = {
    iconPosition: 'start',
    multiline: false
};
exports.TextField.displayName = 'TextField';
exports.default = styles_1.withStyles(styles_2.default)(exports.TextField);
//# sourceMappingURL=TextField.js.map