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
const styles_1 = require("@material-ui/core/styles");
const utils_1 = require("../../utils");
const Label_1 = __importDefault(require("../../Label"));
const Autocomplete_1 = __importDefault(require("../../Autocomplete"));
const styles_2 = __importDefault(require("./styles"));
const TagSelectorInput_1 = __importDefault(require("../TagSelectorInput"));
const getUniqueValue = (value) => `${value.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}`;
exports.TagSelector = react_1.forwardRef(function TagSelector({ loading, placeholder, options, defaultValues, newOptionLabel, onChange, onInputChange }, ref) {
    const [inputValue, setInputValue] = react_1.default.useState(null);
    const [selectedValues, setSelectedValues] = react_1.default.useState(defaultValues);
    const [addedOptions, setAddedOptions] = react_1.default.useState([]);
    const currentOptions = [...options, ...addedOptions];
    const inputRef = utils_1.useCombinedRefs(ref, react_1.useRef(null));
    react_1.default.useLayoutEffect(() => {
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
    const handleInputChange = react_1.default.useCallback((e) => {
        setInputValue((e.target.value || '').trim());
        onInputChange(e);
    }, [onInputChange]);
    const updateSelectedValues = (values) => {
        setSelectedValues(values);
        onChange(values);
    };
    const handleDelete = (value) => {
        const index = selectedValues.indexOf(value);
        updateSelectedValues([
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
    const handleSelect = (item, { resetInput }) => {
        if (!item || !item.value)
            return;
        const isInOptions = currentOptions.find(option => option.value === item.value);
        if (!isInOptions) {
            setAddedOptions([
                ...addedOptions,
                { value: item.value, text: inputValue || '' }
            ]);
        }
        if (!selectedValues.includes(item.value)) {
            updateSelectedValues([...selectedValues, item.value]);
        }
        setInputValue(null);
        resetInput();
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
    const labels = (react_1.default.createElement(react_1.Fragment, null, selectedValues.map(value => {
        const item = currentOptions.find(option => option.value === value);
        if (!item) {
            window.console.warn(`TagSelector: There is no option for the given value \` ${value}\``);
            return null;
        }
        return (react_1.default.createElement(Label_1.default, { key: value, onDelete: () => handleDelete(value) }, item.text));
    })));
    return (react_1.default.createElement(Autocomplete_1.default, { ref: inputRef, placeholder: selectedValues.length === 0 ? placeholder : undefined, options: autocompleteOptions, onSelect: handleSelect, onKeyDown: handleKeyDown, startAdornment: labels, onChange: handleInputChange, debounceTime: 0, loading: loading, inputComponent: TagSelectorInput_1.default }));
});
exports.TagSelector.defaultProps = {
    defaultValues: [],
    loading: false,
    newOptionLabel: 'Add new option: ',
    onChange: () => { },
    onInputChange: () => { },
    options: [],
    placeholder: ''
};
exports.TagSelector.displayName = 'TagSelector';
exports.default = styles_1.withStyles(styles_2.default)(exports.TagSelector);
//# sourceMappingURL=TagSelector.js.map