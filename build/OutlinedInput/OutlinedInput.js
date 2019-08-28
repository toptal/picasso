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
const OutlinedInput_1 = __importDefault(require("@material-ui/core/OutlinedInput"));
const helpers_1 = require("@material-ui/core/utils/helpers");
const styles_2 = __importDefault(require("./styles"));
const OutlinedInput = react_1.forwardRef(function OutlinedInput(_a, ref) {
    var { classes, className, style, id, name, placeholder, autoFocus, autoComplete, multiline, rows, rowsMax, width, disabled, inputComponent, inputProps, value, type, error, startAdornment, endAdornment, onChange, variant } = _a, rest = __rest(_a, ["classes", "className", "style", "id", "name", "placeholder", "autoFocus", "autoComplete", "multiline", "rows", "rowsMax", "width", "disabled", "inputComponent", "inputProps", "value", "type", "error", "startAdornment", "endAdornment", "onChange", "variant"]);
    return (react_1.default.createElement(OutlinedInput_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { classes: {
            root: classnames_1.default(classes.root, classes[`root${helpers_1.capitalize(width)}`], {
                [classes[`rootVariant${helpers_1.capitalize(String(variant))}`]]: variant !== undefined
            }),
            input: classnames_1.default(classes.input, {
                [classes[`inputVariant${helpers_1.capitalize(String(variant))}`]]: variant !== undefined
            }),
            inputMultiline: classes.inputMultiline
        }, className: className, style: style, labelWidth: 0, fullWidth: width === 'full', disabled: disabled, error: error, inputComponent: inputComponent, inputProps: inputProps, inputRef: ref, value: value, type: type, startAdornment: startAdornment, endAdornment: endAdornment, id: id, name: name, placeholder: placeholder, autoFocus: autoFocus, autoComplete: autoComplete, multiline: multiline, rows: rows, rowsMax: rowsMax, onChange: onChange })));
});
OutlinedInput.defaultProps = {
    width: 'auto'
};
OutlinedInput.displayName = 'OutlinedInput';
exports.default = styles_1.withStyles(styles_2.default)(OutlinedInput);
//# sourceMappingURL=OutlinedInput.js.map