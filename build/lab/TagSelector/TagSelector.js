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
import TagSelectorInput from '../TagSelectorInput';
import styles from './styles';
const isIncluded = (items, item) => items.some(({ value }) => value === item.value);
export const TagSelector = forwardRef(function TagSelector(_a, ref) {
    var { loading, placeholder, options = [], otherOptionLabel, onOtherOptionSelect, showOtherOption, value: values = [], getDisplayValue, onChange, inputValue = '', onInputChange, width, enableAutofill } = _a, rest = __rest(_a, ["loading", "placeholder", "options", "otherOptionLabel", "onOtherOptionSelect", "showOtherOption", "value", "getDisplayValue", "onChange", "inputValue", "onInputChange", "width", "enableAutofill"]);
    const inputRef = useCombinedRefs(ref, useRef(null));
    React.useLayoutEffect(() => {
        const inputNode = inputRef.current;
        if (inputNode) {
            const resizeInput = () => {
                const inputLength = inputNode.value.length;
                const isInputBlank = inputLength === 0;
                const isNothingSelected = values.length === 0;
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
    }, [values]);
    const handleDelete = (value) => {
        const index = values.indexOf(value);
        onChange([...values.slice(0, index), ...values.slice(index + 1)]);
    };
    const handleKeyDown = (event, inputValue) => {
        const hasSelection = values.length;
        const isDeleting = event.key === 'Backspace';
        if (hasSelection && !inputValue && isDeleting) {
            handleDelete(values[values.length - 1]);
        }
    };
    const handleSelect = (autocompleteItem) => {
        const item = autocompleteItem;
        if (!isIncluded(values, item)) {
            onChange([...values, item]);
        }
        onInputChange('');
    };
    const handleOtherOptionSelect = (item) => {
        const itemText = getDisplayValue(item);
        const newOption = {
            value: itemText,
            text: itemText
        };
        onOtherOptionSelect(newOption);
        if (!isIncluded(values, newOption)) {
            onChange([...values, newOption]);
        }
        onInputChange('');
    };
    const autocompleteOptions = options.filter(option => !isIncluded(values, option));
    const labels = (React.createElement(Fragment, null, values.map(item => (React.createElement(Label, { key: item.value, onDelete: () => handleDelete(item) }, item.text)))));
    return (React.createElement(Autocomplete
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: inputRef, placeholder: values.length === 0 ? placeholder : undefined, options: autocompleteOptions, value: inputValue, onSelect: handleSelect, onOtherOptionSelect: handleOtherOptionSelect, onChange: onInputChange, onKeyDown: handleKeyDown, startAdornment: labels, loading: loading, inputComponent: TagSelectorInput, width: width, showOtherOption: showOtherOption, otherOptionText: otherOptionLabel, enableAutofill: enableAutofill, getDisplayValue: getDisplayValue })));
});
TagSelector.defaultProps = {
    enableAutofill: false,
    loading: false,
    onChange: () => { },
    onInputChange: () => { },
    onOtherOptionSelect: () => { },
    options: [],
    otherOptionLabel: 'Add new option: ',
    placeholder: '',
    showOtherOption: false
};
TagSelector.displayName = 'TagSelector';
export default withStyles(styles)(TagSelector);
//# sourceMappingURL=TagSelector.js.map