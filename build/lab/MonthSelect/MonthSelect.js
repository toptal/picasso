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
const Select_1 = __importDefault(require("../../Select"));
const OPTIONS = [
    { value: 1, text: 'January' },
    { value: 2, text: 'February' },
    { value: 3, text: 'March' },
    { value: 4, text: 'April' },
    { value: 5, text: 'May' },
    { value: 6, text: 'June' },
    { value: 7, text: 'July' },
    { value: 8, text: 'August' },
    { value: 9, text: 'September' },
    { value: 10, text: 'October' },
    { value: 11, text: 'November' },
    { value: 12, text: 'December' }
];
function getFilteredOptions(from, to) {
    return OPTIONS.slice(from - 1, to);
}
const FIRST_MONTH = 1;
const LAST_MONTH = 12;
exports.MonthSelect = (_a) => {
    var { from = FIRST_MONTH, to = LAST_MONTH, onChange } = _a, rest = __rest(_a, ["from", "to", "onChange"]);
    const handleChange = (event) => {
        onChange(event);
    };
    if (from < FIRST_MONTH ||
        from > LAST_MONTH ||
        to < FIRST_MONTH ||
        to > LAST_MONTH ||
        to < from) {
        throw new Error(`Invalid range. Please check the values you have passed: from: ${from}, to: ${to}`);
    }
    const options = react_1.useMemo(() => getFilteredOptions(from, to), [from, to]);
    // eslint-disable-next-line react/jsx-props-no-spreading
    return react_1.default.createElement(Select_1.default, Object.assign({}, rest, { options: options, onChange: handleChange }));
};
exports.MonthSelect.defaultProps = {
    from: 1,
    to: 12
};
exports.MonthSelect.displayName = 'MonthSelect';
exports.default = exports.MonthSelect;
//# sourceMappingURL=MonthSelect.js.map