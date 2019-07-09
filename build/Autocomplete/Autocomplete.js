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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
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
const isMatchingMinLength = (value, minLength) => !minLength || value.length >= minLength;
exports.Autocomplete = (_a) => {
    var { classes, className, debounceTime, loading, minLength, placeholder, noOptionsText, options, style, width, onSelect, onChange } = _a, rest = __rest(_a, ["classes", "className", "debounceTime", "loading", "minLength", "placeholder", "noOptionsText", "options", "style", "width", "onSelect", "onChange"]);
    const onChangeDebounced = debounce_1.default(onChange, debounceTime);
    return (react_1.default.createElement(downshift_1.default, { onSelect: onSelect }, ({ clearSelection, getInputProps, getItemProps, getMenuProps, highlightedIndex, inputValue, isOpen, openMenu, selectItem }) => {
        const trimmedValue = (inputValue || '').trim();
        const filteredOptions = options.filter(({ label }) => utils_1.isSubstring(trimmedValue, label));
        const isTyping = Boolean(trimmedValue);
        const hasOptions = Boolean(filteredOptions.length);
        const canOpen = isOpen &&
            isMatchingMinLength(trimmedValue, minLength) &&
            !loading &&
            (hasOptions || isTyping);
        const optionsMenu = (react_1.default.createElement(ScrollMenu_1.default, { selectedIndex: highlightedIndex }, !hasOptions ? (react_1.default.createElement(Menu_1.default.Item, { disabled: true }, noOptionsText)) : (filteredOptions.map((option, index) => (react_1.default.createElement(Menu_1.default.Item, Object.assign({ key: option.label, selected: highlightedIndex === index }, getItemProps({ item: option.label })), option.label))))));
        const { onBlur: handleBlur, onFocus: handleFocus, onKeyDown: handleKeyDown, onChange: handleChange, value } = getInputProps({
            onFocus: openMenu,
            onBlur: () => {
                if (!trimmedValue.length || !filteredOptions.length) {
                    return;
                }
                const firstOption = filteredOptions[0];
                if (firstOption) {
                    selectItem(firstOption.label);
                }
            },
            onChange: (event) => {
                if (event.target.value === '') {
                    clearSelection();
                }
                if (!isMatchingMinLength(event.target.value, minLength)) {
                    return;
                }
                event.persist();
                onChangeDebounced(event);
            }
        });
        return (react_1.default.createElement("div", { className: classnames_1.default(classes.root, className, classes[`root${helpers_1.capitalize(width)}`]), style: style },
            react_1.default.createElement(TextField_1.default
            // eslint-disable-next-line react/jsx-props-no-spreading
            , Object.assign({}, rest, { icon: loading ? react_1.default.createElement(Loader_1.default, { size: 'small' }) : null, iconPosition: 'end', onChange: event => {
                    handleChange(event);
                }, 
                // @ts-ignore
                value: value, width: width, onBlur: handleBlur, onFocus: handleFocus, onKeyDown: handleKeyDown, placeholder: placeholder })),
            react_1.default.createElement("div", Object.assign({}, getMenuProps()), canOpen ? optionsMenu : null)));
    }));
};
exports.Autocomplete.defaultProps = {
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