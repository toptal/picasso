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
function generateOptions(from, to) {
    const length = to - from + 1;
    return Array.from({ length }).map((_, index) => {
        const value = index + from;
        return {
            value,
            text: value.toString()
        };
    });
}
exports.YearSelect = react_1.forwardRef(function YearSelect(_a, ref) {
    var { from, to, onChange } = _a, rest = __rest(_a, ["from", "to", "onChange"]);
    const handleChange = (event) => {
        onChange(event);
    };
    if (!to || !from || to < from) {
        throw new Error(`Invalid range. Please check the values you have passed: from: ${from}, to: ${to}`);
    }
    const options = react_1.useMemo(() => generateOptions(from, to), [from, to]);
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    react_1.default.createElement(Select_1.default, Object.assign({}, rest, { ref: ref, options: options, onChange: handleChange })));
});
exports.YearSelect.defaultProps = {};
exports.YearSelect.displayName = 'YearSelect';
exports.default = exports.YearSelect;
//# sourceMappingURL=YearSelect.js.map