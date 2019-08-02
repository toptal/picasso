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
const debounce_1 = __importDefault(require("debounce"));
const TextField_1 = __importDefault(require("../TextField"));
const Menu_1 = __importDefault(require("../Menu"));
const Loader_1 = __importDefault(require("../Loader"));
const ScrollMenu_1 = __importDefault(require("../ScrollMenu"));
const utils_1 = require("../utils");
const styles_2 = __importDefault(require("./styles"));
const DEBOUNCE_TIME = 300;
const EMPTY_VALUE = '';
const isMatchingMinLength = (value, minLength) => !minLength || value.length >= minLength;
const getItemLabel = (item) => {
    if (!item)
        return EMPTY_VALUE;
    return item.label || item.text || EMPTY_VALUE;
};
const getItemValue = (item) => {
    if (!item)
        return EMPTY_VALUE;
    return item.value || getItemLabel(item);
};
exports.Autocomplete = (_a) => {
    var { classes, className, debounceTime, loading, minLength, placeholder: initialPlaceholder, noOptionsText, options: initialOptions, style, width, allowAny, onSelect = () => { }, value, onChange } = _a, rest = __rest(_a, ["classes", "className", "debounceTime", "loading", "minLength", "placeholder", "noOptionsText", "options", "style", "width", "allowAny", "onSelect", "value", "onChange"]);
    const [inputValue, setInputValue] = react_1.useState(null);
    const [filter, setFilter] = react_1.useState(EMPTY_VALUE);
    const [placeholder, setPlaceholder] = react_1.useState(initialPlaceholder);
    const [selectedItem, setSelectedItem] = react_1.useState(null);
    const onChangeDebounced = debounce_1.default(onChange, debounceTime);
    const selectItem = (item) => {
        if (item === undefined)
            return;
        setInputValue(getItemLabel(item));
        setSelectedItem(item);
        if (item !== null) {
            setPlaceholder(getItemLabel(item));
        }
        else {
            setPlaceholder(initialPlaceholder);
        }
        onSelect(item);
    };
    const handleStateChange = (props) => {
        const { selectedItem } = props;
        selectItem(selectedItem);
    };
    const options = initialOptions.filter(item => utils_1.isSubstring(filter || EMPTY_VALUE, getItemLabel(item)));
    const isSelected = (item, selectedItem) => getItemValue(item) === getItemValue(selectedItem);
    const handleChange = (item, helpers) => {
        const { setHighlightedIndex } = helpers;
        const currentIndex = options ? options.indexOf(item) : 0;
        setHighlightedIndex(currentIndex);
    };
    react_1.useEffect(() => {
        const selectedItem = initialOptions.find(option => getItemValue(option) === value);
        if (!selectedItem && allowAny && value !== undefined) {
            setInputValue(String(value));
        }
        else {
            selectItem(selectedItem);
        }
    }, [value]);
    return (react_1.default.createElement(downshift_1.default, { itemToString: item => getItemLabel(item), onStateChange: handleStateChange, onChange: handleChange, inputValue: inputValue, selectedItem: selectedItem }, ({ getMenuProps, getInputProps, getItemProps, isOpen, selectedItem, highlightedIndex, openMenu, selectItem: downshiftSelectItem, setHighlightedIndex, reset }) => {
        const isTyping = Boolean(inputValue);
        const hasOptions = Boolean(options.length);
        const canOpen = isOpen &&
            isMatchingMinLength(inputValue || EMPTY_VALUE, minLength) &&
            !loading &&
            (hasOptions || isTyping);
        const optionsMenu = (react_1.default.createElement(ScrollMenu_1.default, null, !hasOptions ? (react_1.default.createElement(Menu_1.default.Item, { disabled: true }, noOptionsText)) : (options.map((option, index) => (react_1.default.createElement(Menu_1.default.Item, Object.assign({ key: getItemValue(option), selected: highlightedIndex === index, disabled: isSelected(option, selectedItem) }, getItemProps({ item: option })), getItemLabel(option)))))));
        const selectItem = (item) => {
            downshiftSelectItem(item);
            setPlaceholder(initialPlaceholder);
            setFilter(EMPTY_VALUE);
        };
        const { onBlur, onKeyDown, onFocus, onChange = () => { } } = getInputProps({
            onFocus: () => {
                openMenu();
                if (!selectedItem)
                    return;
                const currentIndex = options ? options.indexOf(selectedItem) : 0;
                setPlaceholder(getItemLabel(selectedItem));
                setInputValue(EMPTY_VALUE);
                setHighlightedIndex(currentIndex);
            },
            onBlur: () => {
                if (options.length === 1) {
                    const firstOption = options[0];
                    selectItem(firstOption);
                }
                if (!options.length && !allowAny) {
                    reset();
                    setInputValue(EMPTY_VALUE);
                    setPlaceholder(initialPlaceholder);
                    setFilter(EMPTY_VALUE);
                    return;
                }
                if (!selectedItem)
                    return;
                if (allowAny && getItemLabel(selectedItem) !== inputValue) {
                    if (inputValue !== EMPTY_VALUE) {
                        setSelectedItem(null);
                        setPlaceholder(initialPlaceholder);
                    }
                }
                setInputValue(getItemLabel(selectedItem));
            },
            onKeyDown: (event) => {
                if (event.key === 'Backspace' && inputValue === EMPTY_VALUE) {
                    selectItem(null);
                }
                if (rest.onKeyDown) {
                    rest.onKeyDown(event);
                }
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
        return (react_1.default.createElement("div", { className: classnames_1.default(classes.root, className, classes[`root${helpers_1.capitalize(width)}`]), style: style },
            react_1.default.createElement(TextField_1.default
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            , Object.assign({}, rest, { icon: loading ? react_1.default.createElement(Loader_1.default, { size: 'small' }) : null, iconPosition: 'end', value: inputValue || EMPTY_VALUE, onBlur: onBlur, onKeyDown: onKeyDown, onFocus: onFocus, onClick: onFocus, placeholder: placeholder, width: width, onChange: event => {
                    onChange(event);
                } })),
            react_1.default.createElement("div", Object.assign({}, getMenuProps()), canOpen ? optionsMenu : null)));
    }));
};
exports.Autocomplete.defaultProps = {
    allowAny: true,
    debounceTime: DEBOUNCE_TIME,
    loading: false,
    noOptionsText: 'No options',
    onChange: () => { },
    onSelect: () => { },
    options: [],
    width: 'auto'
};
exports.Autocomplete.displayName = 'Autocomplete';
exports.default = styles_1.withStyles(styles_2.default)(exports.Autocomplete);
//# sourceMappingURL=Autocomplete.js.map