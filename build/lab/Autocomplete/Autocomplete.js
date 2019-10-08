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
import React, { forwardRef, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils/helpers';
import cx from 'classnames';
import Downshift from 'downshift';
import Input from '../../Input';
import Menu from '../../Menu';
import Loader from '../../Loader';
import ScrollMenu from '../../ScrollMenu';
import Typography from '../../Typography';
import { isSubstring } from '../../utils';
import useControlledAndUncontrolledState from '../../utils/use-controlled-and-uncontrolled-state';
import useControlledAndUncontrolledInput from '../../utils/use-controlled-and-uncontrolled-input';
import styles from './styles';
import InputAdornment from '../../InputAdornment';
const EMPTY_INPUT_VALUE = '';
const FIRST_ITEM_INDEX = 0;
const isMatchingMinLength = (value, minLength) => !minLength || value.length >= minLength;
const getItemText = (item) => (item && item.text) || EMPTY_INPUT_VALUE;
const getItemValue = (item) => (item && (item.value || item.text)) || null;
const isSelected = (item, selectedItem) => getItemValue(item) === getItemValue(selectedItem);
const getUniqueValue = (value) => `${value.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}`;
export const Autocomplete = forwardRef(function Autocomplete(_a, ref) {
    var { classes, className, defaultInputValue, inputValue: inputValueProp, onChange: onInputChange, defaultValue, value, onSelect, onOtherOptionSelect, loading, minLength, placeholder, otherOptionText, noOptionsText, options, style, width, allowAny, showOtherOption, onKeyDown, inputComponent, renderOption, endAdornment, icon, error } = _a, rest = __rest(_a, ["classes", "className", "defaultInputValue", "inputValue", "onChange", "defaultValue", "value", "onSelect", "onOtherOptionSelect", "loading", "minLength", "placeholder", "otherOptionText", "noOptionsText", "options", "style", "width", "allowAny", "showOtherOption", "onKeyDown", "inputComponent", "renderOption", "endAdornment", "icon", "error"]);
    const [selectedItemValue, setSelectedItemValue] = useControlledAndUncontrolledState(defaultValue, value, onSelect);
    const selectedItem = selectedItemValue === null
        ? null
        : options.find(option => getItemValue(option) === selectedItemValue);
    const [inputValue, setInputValue] = useControlledAndUncontrolledInput(defaultInputValue || getItemText(selectedItem), inputValueProp, onInputChange);
    if (selectedItem === undefined) {
        window.console.warn(`Autocomplete: There is no option for the given value \`${selectedItemValue}\``);
        return null;
    }
    const handleInputValueChange = (newInputValue) => {
        if (newInputValue !== inputValue) {
            setInputValue(newInputValue);
        }
    };
    const handleSelectItem = (item) => {
        const itemValue = getItemValue(item);
        if (itemValue === null) {
            setSelectedItemValue(itemValue);
            return;
        }
        const isInOptions = options.find(option => option.value === itemValue);
        if (!isInOptions) {
            const itemText = getItemText(item);
            onOtherOptionSelect(itemText);
            return;
        }
        setSelectedItemValue(itemValue);
    };
    const matchingOptions = getItemText(selectedItem) === inputValue
        ? options
        : options.filter(item => isSubstring(inputValue, getItemText(item)));
    const currentSelectedItemIndex = selectedItem
        ? matchingOptions.indexOf(selectedItem)
        : null;
    const downshiftStateReducer = (state, changes) => {
        switch (changes.type) {
            case Downshift.stateChangeTypes.controlledPropUpdatedSelectedItem:
                return Object.assign(Object.assign({}, changes), { highlightedIndex: currentSelectedItemIndex });
            case Downshift.stateChangeTypes.changeInput:
                return Object.assign(Object.assign({}, changes), { highlightedIndex: FIRST_ITEM_INDEX });
            case Downshift.stateChangeTypes.mouseUp:
            case Downshift.stateChangeTypes.blurInput:
                const hasInput = inputValue.length > 0;
                if (allowAny &&
                    hasInput &&
                    inputValue !== getItemText(selectedItem)) {
                    return Object.assign(Object.assign({}, changes), { inputValue, selectedItem: null });
                }
                break;
        }
        return changes;
    };
    const downshiftItemToString = (item) => item === null
        ? allowAny
            ? inputValue
            : EMPTY_INPUT_VALUE
        : getItemText(item);
    return (React.createElement(Downshift, { inputValue: inputValue, onInputValueChange: handleInputValueChange, selectedItem: selectedItem, onChange: handleSelectItem, itemToString: downshiftItemToString, stateReducer: downshiftStateReducer }, ({ getMenuProps, getInputProps, getItemProps, isOpen, highlightedIndex, selectItem, setState }) => {
        const hasMatchingOptions = matchingOptions.length > 0;
        const canOpen = isOpen && isMatchingMinLength(inputValue, minLength) && !loading;
        const matchingOptionsLength = matchingOptions.length;
        const maybeOtherOption = allowAny && showOtherOption && inputValue
            ? {
                value: getUniqueValue(inputValue),
                text: `${inputValue}`
            }
            : null;
        const shouldShowOtherOption = Boolean(maybeOtherOption);
        const optionsMenu = (React.createElement(ScrollMenu, { selectedIndex: highlightedIndex }, hasMatchingOptions || shouldShowOtherOption ? (React.createElement(Fragment, null,
            matchingOptions.map((option, index) => (React.createElement(Menu.Item, Object.assign({ key: getItemValue(option), selected: highlightedIndex === index, disabled: isSelected(option, selectedItem) }, getItemProps({ item: option, index })), renderOption
                ? renderOption(option, index)
                : getItemText(option)))),
            maybeOtherOption && (React.createElement(Menu.Item, Object.assign({ key: getItemValue(maybeOtherOption), selected: highlightedIndex === matchingOptionsLength, disabled: isSelected(maybeOtherOption, selectedItem) }, getItemProps({
                item: maybeOtherOption,
                index: matchingOptionsLength
            }), { className: cx({
                    [classes.otherOption]: matchingOptionsLength
                }) }),
                React.createElement("span", { className: classes.stringContent },
                    React.createElement(Typography, { as: 'span', color: 'dark-grey' }, otherOptionText),
                    inputValue))))) : (React.createElement(Menu.Item, { disabled: true }, noOptionsText))));
        const handleFocusOrClick = () => {
            if (!isOpen) {
                let newInputValue = inputValue;
                const isInputSelectedItem = inputValue === getItemText(selectedItem);
                if (!allowAny || isInputSelectedItem) {
                    newInputValue = EMPTY_INPUT_VALUE;
                }
                setState({
                    isOpen: true,
                    inputValue: newInputValue,
                    highlightedIndex: currentSelectedItemIndex || FIRST_ITEM_INDEX
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
                if (event.key === 'Backspace' &&
                    inputValue === EMPTY_INPUT_VALUE) {
                    selectItem(null);
                }
                onKeyDown(event, inputValue);
            },
            // here we override the value returned from downshift, `off` by default
            autoComplete: rest.autoComplete || 'off'
        });
        return (React.createElement("div", { className: cx(classes.root, className, classes[`root${capitalize(width)}`]), style: style },
            React.createElement(InputComponent
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            , Object.assign({}, rest, inputProps, { error: error, icon: icon, defaultValue: inputProps.defaultValue, value: inputProps.value, onChange: e => {
                    inputProps.onChange(e);
                }, ref: ref, classes: {}, placeholder: selectedItem ? getItemText(selectedItem) : placeholder, endAdornment: loading ? loadingComponent : endAdornment, width: width })),
            React.createElement("div", Object.assign({}, getMenuProps()), canOpen ? optionsMenu : null)));
    }));
});
Autocomplete.defaultProps = {
    allowAny: true,
    defaultInputValue: '',
    defaultValue: null,
    loading: false,
    minLength: 0,
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