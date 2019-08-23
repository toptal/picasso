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
const Select_1 = __importDefault(require("@material-ui/core/Select"));
const styles_1 = require("@material-ui/core/styles");
const helpers_1 = require("@material-ui/core/utils/helpers");
const OutlinedInput_1 = __importDefault(require("../OutlinedInput"));
const InputAdornment_1 = __importDefault(require("../InputAdornment"));
const MenuItem_1 = __importDefault(require("../MenuItem"));
const Typography_1 = __importDefault(require("../Typography"));
const Icon_1 = require("../Icon");
const styles_2 = __importDefault(require("./styles"));
const renderOptions = (options, classes, placeholder, isNative) => {
    if (!options.length) {
        return null;
    }
    const OptionComponent = isNative ? 'option' : MenuItem_1.default;
    const resultOptions = options.map(({ key, value, text }) => (react_1.default.createElement(OptionComponent, { key: key || value, value: value }, text)));
    if (placeholder) {
        resultOptions.unshift(react_1.default.createElement(OptionComponent, { className: classes.placeholderOption, disabled: true, key: 'placeholder', value: '' }, placeholder));
    }
    return resultOptions;
};
exports.Select = react_1.forwardRef(function Select(_a, ref) {
    var { classes, className, style, width, id, icon, iconPosition, native, options, placeholder, disabled, error, onChange, value } = _a, rest = __rest(_a, ["classes", "className", "style", "width", "id", "icon", "iconPosition", "native", "options", "placeholder", "disabled", "error", "onChange", "value"]);
    const isPlaceholderShown = placeholder && value === '';
    const selectedOption = react_1.useMemo(() => options.find(option => option.value === value), [value, options]);
    const outlinedInput = (react_1.default.createElement(OutlinedInput_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: {
            root: classnames_1.default({
                [classes.inputRootNative]: native
            }),
            input: classnames_1.default(classes.input, {
                [classes.inputPlaceholder]: isPlaceholderShown,
                [classes.inputPlaceholderDisabled]: isPlaceholderShown && disabled,
                [classes.inputNative]: native
            })
        }, width: width })));
    const iconAdornment = icon ? (react_1.default.createElement(InputAdornment_1.default, { disabled: disabled, position: iconPosition }, icon)) : null;
    const menuProps = {
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left'
        },
        getContentAnchorEl: undefined // needed to restore default behaviour
    };
    return (react_1.default.createElement(Select_1.default, { className: className, style: style, classes: {
            root: classes[`root${helpers_1.capitalize(width)}`],
            icon: classes.caret,
            select: classes.select
        }, error: error, disabled: disabled, displayEmpty: true, id: id, input: outlinedInput, native: native, variant: 'outlined', value: value, renderValue: () => (react_1.default.createElement(react_1.default.Fragment, null,
            iconPosition === 'start' && iconAdornment,
            react_1.default.createElement(Typography_1.default, { className: classes.inputValue, inline: true, color: 'inherit' },
                selectedOption && selectedOption.text,
                !selectedOption && placeholder),
            iconPosition === 'end' && iconAdornment)), IconComponent: ({ className }) => (react_1.default.createElement(Icon_1.DropdownArrows16, { className: classnames_1.default(className, {
                [classes.caretDisabled]: disabled
            }) })), MenuProps: menuProps, onChange: onChange }, renderOptions(options, classes, placeholder, native)));
});
exports.Select.defaultProps = {
    disabled: false,
    error: false,
    iconPosition: 'start',
    native: false,
    onChange: () => { },
    value: '',
    width: 'full'
};
exports.Select.displayName = 'Select';
exports.default = styles_1.withStyles(styles_2.default)(exports.Select);
//# sourceMappingURL=Select.js.map