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
import React, { forwardRef, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils/helpers';
import cx from 'classnames';
import Popper from '@material-ui/core/Popper';
import Input from '../../Input';
import Menu from '../../Menu';
import Container from '../../Container';
import Loader from '../../Loader';
import ScrollMenu from '../../ScrollMenu';
import Typography from '../../Typography';
import InputAdornment from '../../InputAdornment';
import { useWidthOf } from '../../utils';
import useAutocomplete, { EMPTY_INPUT_VALUE } from './useAutocomplete';
import styles from './styles';
const getItemText = (item) => (item && item.text) || EMPTY_INPUT_VALUE;
const getUniqueValue = (value) => `${value.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}`;
export const Autocomplete = forwardRef(function Autocomplete(_a, ref) {
    var { classes, className, onChange, value, onSelect, onOtherOptionSelect, loading, placeholder, otherOptionText, noOptionsText, options, getDisplayValue, style, width, showOtherOption, onKeyDown, inputComponent, renderOption, endAdornment, icon, error, enableAutofill, autoComplete } = _a, rest = __rest(_a, ["classes", "className", "onChange", "value", "onSelect", "onOtherOptionSelect", "loading", "placeholder", "otherOptionText", "noOptionsText", "options", "getDisplayValue", "style", "width", "showOtherOption", "onKeyDown", "inputComponent", "renderOption", "endAdornment", "icon", "error", "enableAutofill", "autoComplete"]);
    const handleSelect = (item) => {
        const displayValue = getDisplayValue(item);
        const isInOptions = options.find(option => getDisplayValue(option) === displayValue);
        if (!isInOptions) {
            onOtherOptionSelect(item);
            return;
        }
        onSelect(item);
    };
    const { highlightedIndex, isOpen, getItemProps, getInputProps } = useAutocomplete({
        value,
        options,
        enableAutofill,
        autoComplete,
        getDisplayValue: getDisplayValue,
        onSelect: handleSelect,
        onChange,
        onKeyDown
    });
    const optionsLength = options.length;
    const otherOption = {
        text: value
    };
    const shouldShowOtherOption = showOtherOption &&
        value &&
        options.every(option => getDisplayValue(option) !== value);
    const optionsMenu = (React.createElement(ScrollMenu, { selectedIndex: highlightedIndex },
        options.map((option, index) => (React.createElement(Menu.Item, Object.assign({ key: getDisplayValue(option) }, getItemProps(index, option)), renderOption
            ? renderOption(option, index)
            : getDisplayValue(option)))),
        shouldShowOtherOption && (React.createElement(Menu.Item, Object.assign({ key: getUniqueValue(value), className: cx({
                [classes.otherOption]: true
            }) }, getItemProps(optionsLength, otherOption)),
            React.createElement("span", { className: classes.stringContent },
                React.createElement(Typography, { as: 'span', color: 'dark-grey' }, otherOptionText),
                otherOption.text))),
        !optionsLength && !shouldShowOtherOption && (React.createElement(Menu.Item, { disabled: true }, noOptionsText))));
    const InputComponent = inputComponent || Input;
    const loadingComponent = (React.createElement(InputAdornment, { position: 'end' },
        React.createElement(Loader, { size: 'small' })));
    const inputWrapperRef = useRef(null);
    const menuWidth = useWidthOf(inputWrapperRef);
    return (React.createElement("div", { className: cx(classes.root, className, classes[`root${capitalize(width)}`]), style: style, role: 'combobox', "aria-expanded": isOpen, "aria-haspopup": 'listbox' },
        React.createElement(Container, { flex: true, ref: inputWrapperRef },
            React.createElement(InputComponent
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            , Object.assign({}, rest, getInputProps(), { error: error, icon: icon, defaultValue: undefined, value: value, ref: ref, placeholder: placeholder, endAdornment: loading ? loadingComponent : endAdornment, width: width }))),
        React.createElement("div", { role: 'listbox' }, inputWrapperRef.current && (React.createElement(Popper, { open: isOpen && !loading, anchorEl: inputWrapperRef.current, className: classes.popper, style: { width: menuWidth } }, optionsMenu)))));
});
Autocomplete.defaultProps = {
    enableAutofill: false,
    getDisplayValue: getItemText,
    loading: false,
    noOptionsText: 'No options',
    onChange: () => { },
    onKeyDown: () => { },
    onOtherOptionSelect: () => { },
    onSelect: () => { },
    options: [],
    otherOptionText: 'Other option: ',
    showOtherOption: false,
    width: 'auto'
};
Autocomplete.displayName = 'Autocomplete';
export default withStyles(styles)(Autocomplete);
//# sourceMappingURL=Autocomplete.js.map