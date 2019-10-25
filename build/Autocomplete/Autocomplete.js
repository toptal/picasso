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
import React, { useState, useEffect, forwardRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils/helpers';
import cx from 'classnames';
import Downshift from 'downshift';
import debounce from 'debounce';
import Input from '../Input';
import Menu from '../Menu';
import Loader from '../Loader';
import ScrollMenu from '../ScrollMenu';
import { isSubstring } from '../utils';
import styles from './styles';
const DEBOUNCE_TIME = 300;
const EMPTY_VALUE = '';
const isMatchingMinLength = (value, minLength) => !minLength || value.length >= minLength;
const getItemText = (item) => item ? item.text || EMPTY_VALUE : EMPTY_VALUE;
const getItemValue = (item) => item ? item.value || getItemText(item) : EMPTY_VALUE;
export const Autocomplete = forwardRef(function Autocomplete(_a, ref) {
    var { classes, className, debounceTime, loading, minLength, placeholder, noOptionsText, options: initialOptions, style, width, allowAny, onSelect, onKeyDown: onKeyDownProp, defaultValue, value, onChange, inputComponent } = _a, rest = __rest(_a, ["classes", "className", "debounceTime", "loading", "minLength", "placeholder", "noOptionsText", "options", "style", "width", "allowAny", "onSelect", "onKeyDown", "defaultValue", "value", "onChange", "inputComponent"]);
    useEffect(() => {
        window.console.warn(`There is a newer version of this component with the latest fixes and API which can be imported from '@toptal/picasso/lab'.

This version of the component will receive no more updates during v3, and will be replaced by the one in "lab" in the future.
Please update to the new one if you want to get the latest fixes and prepare for the next version.

BREAKING CHANGES:

- \`onChange\` prop function provides a \`string\` as argument instead of an \`Event\`.
- \`debounceTime\` prop removed. Now it is up to the component consumer to debounce any event.
- Beware of how \`value\` and \`defaultValue\` props work now. To simply set an initial value, use \`defaultValue\`. Use \`value\` together with \`onSelect\` for fully controlled mode.`);
    }, []);
    const [inputValue, setInputValue] = useState(null);
    const [filter, setFilter] = useState(EMPTY_VALUE);
    const [selectedItem, setSelectedItem] = useState(null);
    const onChangeDebounced = React.useCallback(debounceTime === 0 ? onChange : debounce(onChange, debounceTime), [onChange, debounceTime]);
    const handleSelectItem = (item) => {
        if (item === undefined) {
            return;
        }
        const internalHelpers = {
            resetInput: () => {
                setInputValue(EMPTY_VALUE);
                setSelectedItem(null);
            }
        };
        setInputValue(getItemText(item));
        setSelectedItem(item);
        onSelect(item, internalHelpers);
    };
    const handleStateChange = ({ selectedItem }) => {
        handleSelectItem(selectedItem);
    };
    const options = initialOptions.filter(item => isSubstring(filter || EMPTY_VALUE, getItemText(item)));
    const isSelected = (item, selectedItem) => getItemValue(item) === getItemValue(selectedItem);
    const handleChange = (item, helpers) => {
        const { setHighlightedIndex } = helpers;
        const currentIndex = options ? options.indexOf(item) : 0;
        setHighlightedIndex(currentIndex);
    };
    useEffect(() => {
        const selectedItem = initialOptions.find(option => getItemValue(option) === value);
        if (!selectedItem && allowAny && value !== undefined) {
            setInputValue(String(value));
        }
        else {
            handleSelectItem(selectedItem);
        }
    }, [value]);
    return (React.createElement(Downshift, { itemToString: item => getItemText(item), onStateChange: handleStateChange, onChange: handleChange, inputValue: inputValue, selectedItem: selectedItem }, ({ getMenuProps, getInputProps, getItemProps, isOpen, selectedItem, highlightedIndex, openMenu, selectItem: downshiftSelectItem, setHighlightedIndex, reset }) => {
        const isTyping = Boolean(inputValue);
        const hasOptions = Boolean(options.length);
        const canOpen = isOpen &&
            isMatchingMinLength(inputValue || EMPTY_VALUE, minLength) &&
            !loading &&
            (hasOptions || isTyping);
        const optionsMenu = (React.createElement(ScrollMenu, { selectedIndex: highlightedIndex }, !hasOptions ? (React.createElement(Menu.Item, { disabled: true }, noOptionsText)) : (options.map((option, index) => (React.createElement(Menu.Item, Object.assign({ key: getItemValue(option), selected: highlightedIndex === index, disabled: isSelected(option, selectedItem) }, getItemProps({ item: option, index })), getItemText(option)))))));
        const selectItem = (item) => {
            downshiftSelectItem(item);
            setFilter(EMPTY_VALUE);
        };
        const { onBlur, onKeyDown, onFocus, onChange = () => { } } = getInputProps({
            onFocus: () => {
                openMenu();
                if (!selectedItem)
                    return;
                const currentIndex = options ? options.indexOf(selectedItem) : 0;
                setHighlightedIndex(currentIndex);
                setInputValue(EMPTY_VALUE);
            },
            onBlur: () => {
                if (!options.length && !allowAny) {
                    reset();
                    setInputValue(EMPTY_VALUE);
                    setFilter(EMPTY_VALUE);
                    return;
                }
                if (!selectedItem)
                    return;
                if (allowAny &&
                    getItemText(selectedItem) !== inputValue &&
                    inputValue !== EMPTY_VALUE) {
                    setSelectedItem(null);
                }
                setInputValue(getItemText(selectedItem));
            },
            onKeyDown: (event) => {
                if (event.key === 'Backspace' && inputValue === EMPTY_VALUE) {
                    selectItem(null);
                }
                onKeyDownProp(event, inputValue);
            },
            onChange: (event) => {
                const { value } = event.target;
                setFilter((value || EMPTY_VALUE).trim());
                setInputValue(value);
                if (!isMatchingMinLength(value, minLength)) {
                    return;
                }
                event.persist();
                onChangeDebounced(event);
            }
        });
        const InputComponent = inputComponent || Input;
        return (React.createElement("div", { className: cx(classes.root, className, classes[`root${capitalize(width)}`]), style: style },
            React.createElement(InputComponent
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            , Object.assign({}, rest, { defaultValue: defaultValue, ref: ref, icon: loading ? React.createElement(Loader, { size: 'small' }) : null, iconPosition: 'end', value: inputValue || EMPTY_VALUE, onBlur: onBlur, onKeyDown: onKeyDown, onFocus: onFocus, onClick: onFocus, placeholder: selectedItem ? getItemText(selectedItem) : placeholder, width: width, onChange: e => {
                    onChange(e);
                } })),
            React.createElement("div", Object.assign({}, getMenuProps()), canOpen ? optionsMenu : null)));
    }));
});
Autocomplete.defaultProps = {
    allowAny: true,
    debounceTime: DEBOUNCE_TIME,
    loading: false,
    noOptionsText: 'No options',
    onChange: () => { },
    onKeyDown: () => { },
    onSelect: () => { },
    options: [],
    width: 'auto'
};
Autocomplete.displayName = 'Autocomplete';
export default withStyles(styles)(Autocomplete);
//# sourceMappingURL=Autocomplete.js.map