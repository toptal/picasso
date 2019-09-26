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
import React, { forwardRef, useMemo } from 'react';
import Select from '../../Select';
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
export const MonthSelect = forwardRef(function MonthSelect(_a, ref) {
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
    const options = useMemo(() => getFilteredOptions(from, to), [from, to]);
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    React.createElement(Select, Object.assign({}, rest, { ref: ref, options: options, onChange: handleChange })));
});
MonthSelect.defaultProps = {
    from: 1,
    to: 12
};
MonthSelect.displayName = 'MonthSelect';
export default MonthSelect;
//# sourceMappingURL=MonthSelect.js.map