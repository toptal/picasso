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
import React, { useState } from 'react';
import format from 'date-fns/format';
import { ClickAwayListener } from '../../utils';
import Container from '../../Container';
import Input from '../../Input';
import Calendar from '../Calendar';
function isDateRange(value) {
    return Array.isArray(value);
}
const formatDate = (date) => format(date, 'MMM d, yyyy');
const formatDateRange = (dates) => dates.map(formatDate).join(' - ');
const formatValue = (value) => {
    if (isDateRange(value)) {
        return formatDateRange(value);
    }
    else {
        return formatDate(value);
    }
};
export const DatePicker = (_a) => {
    var { onSelect, range, value: initialValue, width } = _a, rest = __rest(_a, ["onSelect", "range", "value", "width"]);
    const [calendarOpened, setCalendarOpened] = useState(false);
    const [inputValue, setInputValue] = useState(initialValue ? formatValue(initialValue) : undefined);
    const openCalendar = () => setCalendarOpened(true);
    const closeCalendar = () => setCalendarOpened(false);
    const handleSelect = (value) => {
        setInputValue(formatValue(value));
        onSelect(value);
    };
    return (React.createElement(ClickAwayListener, { onClickAway: closeCalendar },
        React.createElement(Container, { inline: width !== 'full' },
            React.createElement(Input
            // eslint-disable-next-line react/jsx-props-no-spreading
            , Object.assign({}, rest, { value: inputValue, onFocus: openCalendar, width: width })),
            React.createElement(Calendar, { activeMonth: initialValue, value: initialValue, open: calendarOpened, onSelect: handleSelect, range: range }))));
};
DatePicker.defaultProps = {
    range: false
};
DatePicker.displayName = 'DatePicker';
export default DatePicker;
//# sourceMappingURL=DatePicker.js.map