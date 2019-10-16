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
import React, { forwardRef } from 'react';
import cx from 'classnames';
import MUISelect from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils/helpers';
import OutlinedInput from '../OutlinedInput';
import InputAdornment from '../InputAdornment';
import MenuItem from '../MenuItem';
import Typography from '../Typography';
import { DropdownArrows16 } from '../Icon';
import styles from './styles';
function createSelectMultiple(allOptions, selectedValues) {
    const isSelected = () => selectedValues.length > 0;
    const display = () => selectedOptions()
        .map(({ text }) => text)
        .join(', ');
    const selectedOptions = () => allOptions.filter(({ value }) => selectedValues.includes(value));
    return {
        display,
        isSelected
    };
}
function createSelectSingle(allOptions, selectedValue) {
    const isSelected = () => !!selectedValue;
    const defaultOption = { text: '', value: '' };
    const selectedOption = () => allOptions.find(option => option.value === selectedValue) || defaultOption;
    const display = () => selectedOption().text;
    return {
        display,
        isSelected
    };
}
const renderOptions = (options, classes, placeholder, isNative) => {
    if (!options.length) {
        return null;
    }
    const OptionComponent = isNative ? 'option' : MenuItem;
    const resultOptions = options.map(({ key, value, text }) => (React.createElement(OptionComponent, { key: key || value, value: value }, text)));
    if (placeholder) {
        resultOptions.unshift(React.createElement(OptionComponent, { className: classes.placeholderOption, disabled: true, key: 'placeholder', value: '' }, placeholder));
    }
    return resultOptions;
};
export const Select = forwardRef(function Select(_a, ref) {
    var { classes, className, style, width, id, icon, iconPosition, native, options, placeholder, disabled, error, onChange, multiple, value = multiple ? [] : '' } = _a, rest = __rest(_a, ["classes", "className", "style", "width", "id", "icon", "iconPosition", "native", "options", "placeholder", "disabled", "error", "onChange", "multiple", "value"]);
    const select = Array.isArray(value)
        ? createSelectMultiple(options, value)
        : createSelectSingle(options, value);
    const renderValue = () => {
        return select.isSelected() ? select.display() : placeholder;
    };
    const isPlaceholderShown = placeholder && !select.isSelected();
    const outlinedInput = (React.createElement(OutlinedInput
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: {
            root: cx({
                [classes.inputRootNative]: native
            }),
            input: cx(classes.input, {
                [classes.inputPlaceholder]: isPlaceholderShown,
                [classes.inputPlaceholderDisabled]: isPlaceholderShown && disabled,
                [classes.inputNative]: native
            })
        }, width: width })));
    const iconAdornment = icon ? (React.createElement(InputAdornment, { disabled: disabled, position: iconPosition }, icon)) : null;
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
    return (React.createElement(MUISelect, { className: className, style: style, classes: {
            root: classes[`root${capitalize(width)}`],
            icon: classes.caret,
            select: classes.select
        }, error: error, disabled: disabled, displayEmpty: true, id: id, input: outlinedInput, native: native, variant: 'outlined', value: value, multiple: multiple, renderValue: () => (React.createElement(React.Fragment, null,
            iconPosition === 'start' && iconAdornment,
            React.createElement(Typography, { className: classes.inputValue, inline: true, color: 'inherit' }, renderValue()),
            iconPosition === 'end' && iconAdornment)), IconComponent: ({ className }) => (React.createElement(DropdownArrows16, { className: cx(className, {
                [classes.caretDisabled]: disabled
            }) })), MenuProps: menuProps, onChange: onChange }, renderOptions(options, classes, placeholder, native)));
});
Select.defaultProps = {
    disabled: false,
    error: false,
    iconPosition: 'start',
    native: false,
    onChange: () => { },
    width: 'full'
};
Select.displayName = 'Select';
export default withStyles(styles)(Select);
//# sourceMappingURL=Select.js.map