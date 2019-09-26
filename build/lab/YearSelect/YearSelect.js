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
export const YearSelect = forwardRef(function YearSelect(_a, ref) {
    var { from, to, onChange } = _a, rest = __rest(_a, ["from", "to", "onChange"]);
    const handleChange = (event) => {
        onChange(event);
    };
    if (!to || !from || to < from) {
        throw new Error(`Invalid range. Please check the values you have passed: from: ${from}, to: ${to}`);
    }
    const options = useMemo(() => generateOptions(from, to), [from, to]);
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    React.createElement(Select, Object.assign({}, rest, { ref: ref, options: options, onChange: handleChange })));
});
YearSelect.defaultProps = {};
YearSelect.displayName = 'YearSelect';
export default YearSelect;
//# sourceMappingURL=YearSelect.js.map