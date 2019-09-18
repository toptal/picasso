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
const helpers_1 = require("@material-ui/core/utils/helpers");
const classnames_1 = __importDefault(require("classnames"));
const downshift_1 = __importDefault(require("downshift"));
const Input_1 = __importDefault(require("../../Input"));
const Menu_1 = __importDefault(require("../../Menu"));
const Loader_1 = __importDefault(require("../../Loader"));
const ScrollMenu_1 = __importDefault(require("../../ScrollMenu"));
const utils_1 = require("../../utils");
const use_controlled_and_uncontrolled_state_1 = __importDefault(require("../../utils/use-controlled-and-uncontrolled-state"));
const use_controlled_and_uncontrolled_input_1 = __importDefault(require("../../utils/use-controlled-and-uncontrolled-input"));
const styles_2 = __importDefault(require("./styles"));
const EMPTY_INPUT_VALUE = '';
const FIRST_ITEM_INDEX = 0;
const isMatchingMinLength = (value, minLength) => !minLength || value.length >= minLength;
const getItemText = (item) => (item && item.text) || EMPTY_INPUT_VALUE;
const getItemValue = (item) => (item && (item.value || item.text)) || null;
const isSelected = (item, selectedItem) => getItemValue(item) === getItemValue(selectedItem);
exports.Autocomplete = react_1.forwardRef(function Autocomplete(_a, ref) {
    var { classes, className, defaultInputValue, inputValue: inputValueProp, onChange: onInputChange, defaultValue, value, onSelect, loading, minLength, placeholder, noOptionsText, options, style, width, allowAny, onKeyDown, inputComponent } = _a, rest = __rest(_a, ["classes", "className", "defaultInputValue", "inputValue", "onChange", "defaultValue", "value", "onSelect", "loading", "minLength", "placeholder", "noOptionsText", "options", "style", "width", "allowAny", "onKeyDown", "inputComponent"]);
    const [selectedItemValue, setSelectedItemValue] = use_controlled_and_uncontrolled_state_1.default(defaultValue, value, onSelect);
    const selectedItem = selectedItemValue === null
        ? null
        : options.find(option => getItemValue(option) === selectedItemValue);
    const [inputValue, setInputValue] = use_controlled_and_uncontrolled_input_1.default(defaultInputValue || getItemText(selectedItem), inputValueProp, onInputChange);
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
        setSelectedItemValue(getItemValue(item));
    };
    const matchingOptions = getItemText(selectedItem) === inputValue
        ? options
        : options.filter(item => utils_1.isSubstring(inputValue, getItemText(item)));
    const currentSelectedItemIndex = selectedItem
        ? matchingOptions.indexOf(selectedItem)
        : null;
    const downshiftStateReducer = (state, changes) => {
        switch (changes.type) {
            case downshift_1.default.stateChangeTypes.controlledPropUpdatedSelectedItem:
                return Object.assign({}, changes, { highlightedIndex: currentSelectedItemIndex });
            case downshift_1.default.stateChangeTypes.changeInput:
                return Object.assign({}, changes, { highlightedIndex: FIRST_ITEM_INDEX });
            case downshift_1.default.stateChangeTypes.mouseUp:
            case downshift_1.default.stateChangeTypes.blurInput:
                const hasInput = inputValue.length > 0;
                if (allowAny &&
                    hasInput &&
                    inputValue !== getItemText(selectedItem)) {
                    return Object.assign({}, changes, { inputValue, selectedItem: null });
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
    return (react_1.default.createElement(downshift_1.default, { inputValue: inputValue, onInputValueChange: handleInputValueChange, selectedItem: selectedItem, onChange: handleSelectItem, itemToString: downshiftItemToString, stateReducer: downshiftStateReducer }, ({ getMenuProps, getInputProps, getItemProps, isOpen, highlightedIndex, selectItem, setState }) => {
        const hasMatchingOptions = matchingOptions.length > 0;
        const canOpen = isOpen && isMatchingMinLength(inputValue, minLength) && !loading;
        const optionsMenu = (react_1.default.createElement(ScrollMenu_1.default, { selectedIndex: highlightedIndex }, hasMatchingOptions ? (matchingOptions.map((option, index) => (react_1.default.createElement(Menu_1.default.Item, Object.assign({ key: getItemValue(option), selected: highlightedIndex === index, disabled: isSelected(option, selectedItem) }, getItemProps({ item: option, index })), getItemText(option))))) : (react_1.default.createElement(Menu_1.default.Item, { disabled: true }, noOptionsText))));
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
        const InputComponent = inputComponent || Input_1.default;
        const inputProps = getInputProps({
            onFocus: handleFocusOrClick,
            onClick: handleFocusOrClick,
            onKeyDown: (event) => {
                if (event.key === 'Backspace' &&
                    inputValue === EMPTY_INPUT_VALUE) {
                    selectItem(null);
                }
                onKeyDown(event, inputValue);
            }
        });
        return (react_1.default.createElement("div", { className: classnames_1.default(classes.root, className, classes[`root${helpers_1.capitalize(width)}`]), style: style },
            react_1.default.createElement(InputComponent
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            , Object.assign({}, rest, inputProps, { defaultValue: inputProps.defaultValue, value: inputProps.value, onChange: e => {
                    inputProps.onChange(e);
                }, ref: ref, classes: {}, placeholder: selectedItem ? getItemText(selectedItem) : placeholder, icon: loading ? react_1.default.createElement(Loader_1.default, { size: 'small' }) : null, iconPosition: 'end', width: width })),
            react_1.default.createElement("div", Object.assign({}, getMenuProps()), canOpen ? optionsMenu : null)));
    }));
});
exports.Autocomplete.defaultProps = {
    allowAny: true,
    defaultInputValue: '',
    defaultValue: null,
    loading: false,
    minLength: 0,
    noOptionsText: 'No options',
    onChange: () => { },
    onKeyDown: () => { },
    onSelect: () => { },
    options: [],
    width: 'auto'
};
exports.Autocomplete.displayName = 'Autocomplete';
exports.default = styles_1.withStyles(styles_2.default)(exports.Autocomplete);
//# sourceMappingURL=Autocomplete.js.map