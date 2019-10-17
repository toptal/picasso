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
import React, { forwardRef, useMemo, useLayoutEffect, useState, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils/helpers';
import cx from 'classnames';
import Popper from '@material-ui/core/Popper';
import Downshift from 'downshift';
import Input from '../../Input';
import Menu from '../../Menu';
import Container from '../../Container';
import Loader from '../../Loader';
import ScrollMenu from '../../ScrollMenu';
import Typography from '../../Typography';
import InputAdornment from '../../InputAdornment';
import styles from './styles';
const EMPTY_INPUT_VALUE = '';
const FIRST_ITEM_INDEX = 0;
/**
 * Specification has two options to enable/disable autofill:
 * "on"|"off", but google chrome doesn't respect specification and
 * enables autofill for inputs with common name like "email", "address" etc
 * As a workaround it's possible to use any incorrect string as a value of
 * "autocomplete" field. "none" is our current choice.
 */
const AUTOFILL_DISABLED_STATE = 'none';
export const getAutocompletePropValue = (enableAutofill, autoComplete) => {
    return enableAutofill ? autoComplete : AUTOFILL_DISABLED_STATE;
};
const getItemText = (item) => item && item.text ? item.text : EMPTY_INPUT_VALUE;
const getUniqueValue = (value) => `${value.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}`;
export const Autocomplete = forwardRef(function Autocomplete(_a, ref) {
    var { classes, className, onChange: onInputChange, value, onSelect, onOtherOptionSelect, loading, placeholder, otherOptionText, noOptionsText, options, getDisplayValue, style, width, showOtherOption, onKeyDown, inputComponent, renderOption, endAdornment, icon, error, enableAutofill, autoComplete } = _a, rest = __rest(_a, ["classes", "className", "onChange", "value", "onSelect", "onOtherOptionSelect", "loading", "placeholder", "otherOptionText", "noOptionsText", "options", "getDisplayValue", "style", "width", "showOtherOption", "onKeyDown", "inputComponent", "renderOption", "endAdornment", "icon", "error", "enableAutofill", "autoComplete"]);
    const autoCompletePropValue = useMemo(() => getAutocompletePropValue(enableAutofill, autoComplete), [enableAutofill, autoComplete]);
    const inputWrapperRef = useRef(null);
    const [menuWidth, setMenuWidth] = useState();
    useLayoutEffect(() => {
        if (!inputWrapperRef.current) {
            return;
        }
        const { width } = inputWrapperRef.current.getBoundingClientRect();
        setMenuWidth(`${width}px`);
    }, [inputWrapperRef.current]);
    const handleInputValueChange = (newValue) => {
        if (newValue !== value) {
            onInputChange(newValue);
        }
    };
    const handleSelectItem = (item) => {
        const displayValue = getDisplayValue(item);
        if (item === null || displayValue === null) {
            return;
        }
        const isInOptions = options.find(option => getDisplayValue(option) === displayValue);
        if (!isInOptions) {
            onOtherOptionSelect(item);
            return;
        }
        onSelect(item);
    };
    const downshiftStateReducer = (state, changes) => {
        switch (changes.type) {
            case Downshift.stateChangeTypes.changeInput:
                return Object.assign(Object.assign({}, changes), { highlightedIndex: FIRST_ITEM_INDEX });
            case Downshift.stateChangeTypes.mouseUp:
            case Downshift.stateChangeTypes.blurInput:
                return Object.assign(Object.assign({}, changes), { inputValue: value, selectedItem: null });
        }
        return changes;
    };
    return (React.createElement(Downshift, { inputValue: value, onInputValueChange: handleInputValueChange, onChange: handleSelectItem, itemToString: getDisplayValue, stateReducer: downshiftStateReducer }, ({ getMenuProps, getInputProps, getItemProps, isOpen, highlightedIndex, selectItem, setState }) => {
        const canOpen = isOpen && !loading;
        const optionsLength = options.length;
        const otherOption = {
            text: value
        };
        const shouldShowOtherOption = showOtherOption && value;
        const optionsMenu = (React.createElement(ScrollMenu, { selectedIndex: highlightedIndex },
            options.map((option, index) => (React.createElement(Menu.Item, Object.assign({ key: getDisplayValue(option), selected: highlightedIndex === index }, getItemProps({ item: option, index })), renderOption
                ? renderOption(option, index)
                : getDisplayValue(option)))),
            shouldShowOtherOption && (React.createElement(Menu.Item, Object.assign({ key: getUniqueValue(value), selected: highlightedIndex === optionsLength }, getItemProps({
                item: otherOption,
                index: optionsLength
            }), { className: cx({
                    [classes.otherOption]: Boolean(optionsLength)
                }) }),
                React.createElement("span", { className: classes.stringContent },
                    React.createElement(Typography, { as: 'span', color: 'dark-grey' }, otherOptionText),
                    otherOption.text))),
            !optionsLength && !shouldShowOtherOption && (React.createElement(Menu.Item, { disabled: true }, noOptionsText))));
        const handleFocusOrClick = () => {
            if (!isOpen) {
                setState({
                    isOpen: true,
                    inputValue: value,
                    highlightedIndex: FIRST_ITEM_INDEX
                });
            }
        };
        const InputComponent = inputComponent || Input;
        const loadingComponent = (React.createElement(InputAdornment, { position: 'end' },
            React.createElement(Loader, { size: 'small' })));
        const inputProps = getInputProps({
            onFocus: handleFocusOrClick,
            onClick: handleFocusOrClick,
            onKeyDown: (event) => {
                if (event.key === 'Backspace' && value === EMPTY_INPUT_VALUE) {
                    selectItem(null);
                }
                onKeyDown(event, value);
            },
            // here we override the value returned from downshift, `off` by default
            autoComplete: autoCompletePropValue
        });
        return (React.createElement("div", { className: cx(classes.root, className, classes[`root${capitalize(width)}`]), style: style },
            React.createElement(Container, { flex: true, ref: inputWrapperRef },
                React.createElement(InputComponent
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                , Object.assign({}, rest, inputProps, { error: error, icon: icon, defaultValue: undefined, value: value, onChange: e => {
                        inputProps.onChange(e);
                    }, ref: ref, classes: {}, placeholder: placeholder, endAdornment: loading ? loadingComponent : endAdornment, width: width }))),
            React.createElement("div", Object.assign({}, getMenuProps()), inputWrapperRef.current && (React.createElement(Popper, { open: canOpen, anchorEl: inputWrapperRef.current, className: classes.popper, style: { width: menuWidth } }, optionsMenu)))));
    }));
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