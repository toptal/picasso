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
const styles_1 = require("@material-ui/core/styles");
const utils_1 = require("../../utils");
const Label_1 = __importDefault(require("../../Label"));
const Autocomplete_1 = __importDefault(require("../Autocomplete"));
const styles_2 = __importDefault(require("./styles"));
const TagSelectorInput_1 = __importDefault(require("../TagSelectorInput"));
const use_controlled_and_uncontrolled_state_1 = __importDefault(require("../../utils/use-controlled-and-uncontrolled-state"));
const use_controlled_and_uncontrolled_input_1 = __importDefault(require("../../utils/use-controlled-and-uncontrolled-input"));
const getUniqueValue = (value) => `${value.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}`;
exports.TagSelector = react_1.forwardRef(function TagSelector(_a, ref) {
    var { loading, placeholder, options, newOptionLabel, defaultValue, value, onChange, defaultInputValue, inputValue: inputValueProp, onInputChange, width } = _a, rest = __rest(_a, ["loading", "placeholder", "options", "newOptionLabel", "defaultValue", "value", "onChange", "defaultInputValue", "inputValue", "onInputChange", "width"]);
    const [inputValue, setInputValue] = use_controlled_and_uncontrolled_input_1.default(defaultInputValue, inputValueProp, onInputChange);
    const [selectedValues, setSelectedValues] = use_controlled_and_uncontrolled_state_1.default(defaultValue, value, onChange);
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
    const labels = (react_1.default.createElement(react_1.Fragment, null, selectedValues.map(value => {
        const item = currentOptions.find(option => option.value === value);
        if (!item) {
            window.console.warn(`TagSelector: There is no option for the given value \`${value}\``);
            return null;
        }
        return (react_1.default.createElement(Label_1.default, { key: value, onDelete: () => handleDelete(value) }, item.text));
    })));
    return (react_1.default.createElement(Autocomplete_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: inputRef, placeholder: selectedValues.length === 0 ? placeholder : undefined, options: autocompleteOptions, value: null, onSelect: handleSelect, inputValue: inputValue, onChange: setInputValue, onKeyDown: handleKeyDown, startAdornment: labels, debounceTime: 0, loading: loading, inputComponent: TagSelectorInput_1.default, width: width })));
});
exports.TagSelector.defaultProps = {
    defaultValue: [],
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