"use strict";
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
const FormControl_1 = __importDefault(require("../FormControl"));
const OutlinedInput_1 = __importDefault(require("../OutlinedInput"));
const InputAdornment_1 = __importDefault(require("../InputAdornment"));
const MenuItem_1 = __importDefault(require("../MenuItem"));
const Typography_1 = __importDefault(require("../Typography"));
const Icon_1 = require("../Icon");
const styles_2 = __importDefault(require("./styles"));
const renderOptions = (options, placeholder, isNative) => {
    if (!options.length) {
        return null;
    }
    const OptionComponent = isNative ? 'option' : MenuItem_1.default;
    const resultOptions = options.map(({ key, value, text }) => (react_1.default.createElement(OptionComponent, { key: key || value, value: value }, text)));
    if (placeholder) {
        resultOptions.unshift(react_1.default.createElement(OptionComponent, { disabled: true, key: 'placeholder', value: '' }, placeholder));
    }
    return resultOptions;
};
exports.Select = ({ classes, className, style, width, id, icon, iconPosition, native, options, placeholder, disabled, error, onChange, value }) => {
    const fullWidth = width === 'full';
    const isPlaceholderShown = placeholder && value === '';
    const selectedOption = react_1.useMemo(() => options.find(option => option.value === value), [value, options]);
    const outlinedInput = (react_1.default.createElement(OutlinedInput_1.default, { classes: {
            input: classnames_1.default(classes.input, {
                [classes.inputPlaceholder]: isPlaceholderShown,
                [classes.inputPlaceholderDisabled]: isPlaceholderShown && disabled,
                [classes.inputNative]: native
            })
        }, fullWidth: fullWidth, labelWidth: 0 }));
    const iconAdornment = icon ? (react_1.default.createElement(InputAdornment_1.default, { className: classnames_1.default(classes.icon, {
            [classes.iconDisabled]: disabled,
            [classes.iconStart]: iconPosition === 'start',
            [classes.iconEnd]: iconPosition === 'end'
        }), position: iconPosition }, icon)) : null;
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
    const select = (react_1.default.createElement(Select_1.default, { className: className, style: style, classes: {
            root: classnames_1.default(classes.root, classes[`root${helpers_1.capitalize(width)}`], {
                [classes.selectNative]: native
            }),
            icon: classes.caret,
            select: classes.select
        }, displayEmpty: true, id: id, input: outlinedInput, native: native, variant: 'outlined', value: value, renderValue: () => (react_1.default.createElement(react_1.default.Fragment, null,
            iconPosition === 'start' && iconAdornment,
            react_1.default.createElement(Typography_1.default, { className: classes.inputValue, inline: true, color: 'inherit' },
                selectedOption && selectedOption.text,
                !selectedOption && placeholder),
            iconPosition === 'end' && iconAdornment)), IconComponent: ({ className }) => (react_1.default.createElement(Icon_1.DropdownArrows, { className: classnames_1.default(className, {
                [classes.caretDisabled]: disabled
            }) })), MenuProps: menuProps, onChange: onChange }, renderOptions(options, placeholder, native)));
    return (react_1.default.createElement(FormControl_1.default, { error: error, disabled: disabled, className: classnames_1.default(className, { [classes.rootFull]: fullWidth }) }, select));
};
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