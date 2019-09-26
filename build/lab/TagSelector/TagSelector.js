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
import React, { Fragment, forwardRef, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useCombinedRefs } from '../../utils';
import Label from '../../Label';
import Autocomplete from '../Autocomplete';
import styles from './styles';
import TagSelectorInput from '../TagSelectorInput';
import useControlledAndUncontrolledState from '../../utils/use-controlled-and-uncontrolled-state';
import useControlledAndUncontrolledInput from '../../utils/use-controlled-and-uncontrolled-input';
const getUniqueValue = (value) => `${value.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}`;
export const TagSelector = forwardRef(function TagSelector(_a, ref) {
    var { loading, placeholder, options, newOptionLabel, defaultValue, value, onChange, defaultInputValue, inputValue: inputValueProp, onInputChange, width } = _a, rest = __rest(_a, ["loading", "placeholder", "options", "newOptionLabel", "defaultValue", "value", "onChange", "defaultInputValue", "inputValue", "onInputChange", "width"]);
    const [inputValue, setInputValue] = useControlledAndUncontrolledInput(defaultInputValue, inputValueProp, onInputChange);
    const [selectedValues, setSelectedValues] = useControlledAndUncontrolledState(defaultValue, value, onChange);
    const [addedOptions, setAddedOptions] = React.useState([]);
    const currentOptions = [...options, ...addedOptions];
    const inputRef = useCombinedRefs(ref, useRef(null));
    React.useLayoutEffect(() => {
        const inputNode = inputRef.current;
        if (inputNode) {
            const resizeInput = () => {
                const inputLength = inputNode.value.length;
                const isInputBlank = inputLength === 0;
                const isNothingSelected = selectedValues.length === 0;
                const isShowingPlaceholder = isInputBlank && isNothingSelected;
                inputNode.style.width = isShowingPlaceholder
                    ? 'auto'
                    : `${inputLength + 2}ch`;
            };
            resizeInput();
            inputNode.addEventListener('input', resizeInput);
            return () => {
                inputNode.removeEventListener('input', resizeInput);
            };
        }
    }, [selectedValues]);
    const handleDelete = (value) => {
        const index = selectedValues.indexOf(value);
        setSelectedValues([
            ...selectedValues.slice(0, index),
            ...selectedValues.slice(index + 1)
        ]);
    };
    const handleKeyDown = (event, inputValue) => {
        const hasSelection = selectedValues.length;
        const hasValue = inputValue;
        const isDeleting = event.key === 'Backspace';
        if (hasSelection && !hasValue && isDeleting) {
            handleDelete(selectedValues[selectedValues.length - 1]);
        }
    };
    const handleSelect = (itemValue) => {
        if (!itemValue)
            return;
        const isInOptions = currentOptions.find(option => option.value === itemValue);
        if (!isInOptions) {
            setAddedOptions([
                ...addedOptions,
                {
                    value: itemValue,
                    text: inputValue.replace(newOptionLabel || '', '')
                }
            ]);
        }
        if (!selectedValues.includes(itemValue)) {
            setSelectedValues([...selectedValues, itemValue]);
        }
        setInputValue('');
    };
    const nonSelectedOptions = currentOptions.filter(item => !selectedValues.includes(item.value));
    const maybeNewOptions = inputValue
        ? [
            {
                value: getUniqueValue(inputValue),
                text: `${newOptionLabel}${inputValue}`
            }
        ]
        : [];
    const autocompleteOptions = [
        ...nonSelectedOptions,
        ...maybeNewOptions
    ];
    const labels = (React.createElement(Fragment, null, selectedValues.map(value => {
        const item = currentOptions.find(option => option.value === value);
        if (!item) {
            window.console.warn(`TagSelector: There is no option for the given value \`${value}\``);
            return null;
        }
        return (React.createElement(Label, { key: value, onDelete: () => handleDelete(value) }, item.text));
    })));
    return (React.createElement(Autocomplete
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: inputRef, placeholder: selectedValues.length === 0 ? placeholder : undefined, options: autocompleteOptions, value: null, onSelect: handleSelect, inputValue: inputValue, onChange: setInputValue, onKeyDown: handleKeyDown, startAdornment: labels, loading: loading, inputComponent: TagSelectorInput, width: width })));
});
TagSelector.defaultProps = {
    defaultValue: [],
    loading: false,
    newOptionLabel: 'Add new option: ',
    onChange: () => { },
    onInputChange: () => { },
    options: [],
    placeholder: ''
};
TagSelector.displayName = 'TagSelector';
export default withStyles(styles)(TagSelector);
//# sourceMappingURL=TagSelector.js.map