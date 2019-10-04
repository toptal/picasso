import React, { useState } from 'react';
import format from 'date-fns/format';
import { ClickAwayListener } from '../../utils';
import { Input, Container } from '../..';
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
export const DatePicker = ({ onSelect, range, value: initialValue }) => {
    const [calendarOpened, setCalendarOpened] = useState(false);
    const [inputValue, setInputValue] = useState(initialValue ? formatValue(initialValue) : undefined);
    const openCalendar = () => setCalendarOpened(true);
    const closeCalendar = () => setCalendarOpened(false);
    const handleSelect = (value) => {
        setInputValue(formatValue(value));
        onSelect(value);
    };
    return (React.createElement(ClickAwayListener, { onClickAway: closeCalendar },
        React.createElement(Container, { inline: true },
            React.createElement(Input, { value: inputValue, onFocus: openCalendar }),
            React.createElement(Calendar, { activeMonth: initialValue, value: initialValue, open: calendarOpened, onSelect: handleSelect, range: range }))));
};
DatePicker.defaultProps = {
    range: false
};
DatePicker.displayName = 'DatePicker';
export default DatePicker;
//# sourceMappingURL=DatePicker.js.map