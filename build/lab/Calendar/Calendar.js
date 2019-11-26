import React, { useState } from 'react';
// @ts-ignore
import SimpleReactCalendar from 'simple-react-calendar';
import cx from 'classnames';
import format from 'date-fns/format';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '../..';
import { ChevronMinor16, BackMinor16 } from '../../Icon';
import styles from './styles';
function isDateRange(value) {
    return !(value instanceof Date) && Boolean(value.start && value.end);
}
const useStyles = makeStyles(styles);
export const Calendar = (props) => {
    const classes = useStyles(props);
    const { range = false, open = false, activeMonth = new Date(), value: initialValue, onSelect } = props;
    const [value, setValue] = useState(initialValue);
    if (!open)
        return null;
    const handleSelect = (selection) => {
        setValue(selection);
        if (isDateRange(selection)) {
            const { start, end } = selection;
            onSelect([start, end]);
        }
        else {
            onSelect(selection);
        }
    };
    return (React.createElement(SimpleReactCalendar, { selected: value, onSelect: handleSelect, customRender: ({ children }) => {
            return React.createElement("div", { className: classes.root }, children);
        }, renderDay: ({ isSelected, isSelectable, isToday, isMonthNext, isMonthPrev, isSelectionStart, isSelectionEnd, handleOnClick, handleOnEnter, date, children }) => {
            return (React.createElement("button", { className: cx(classes.day, {
                    [classes.selected]: isSelected,
                    [classes.selectable]: isSelectable,
                    [classes.today]: isToday,
                    [classes.grayed]: (isMonthPrev || isMonthNext) && !isSelected,
                    [classes.startSelection]: isSelectionStart,
                    [classes.endSelection]: isSelectionEnd
                }), onClick: handleOnClick, onMouseEnter: handleOnEnter, value: date.toString(), type: 'button' }, children));
        }, renderMonthHeader: ({ switchMonth, activeMonth: headerActiveMonth }) => {
            return (React.createElement("div", { className: classes.actions },
                React.createElement(Button, { variant: 'flat', size: 'small', onClick: () => switchMonth(-1) },
                    React.createElement(BackMinor16, null)),
                React.createElement(Typography, { variant: 'heading', size: 'medium' }, format(headerActiveMonth, 'MMMM y')),
                React.createElement(Button, { variant: 'flat', size: 'small', onClick: () => switchMonth(1) },
                    React.createElement(ChevronMinor16, null))));
        }, renderDaysOfWeek: ({ children }) => {
            return React.createElement("div", { className: classes.weekDays }, children);
        }, renderDayOfWeek: ({ children }) => {
            return React.createElement("div", { className: classes.weekDay }, children);
        }, renderWeek: ({ children }) => {
            return React.createElement("div", { className: classes.week }, children);
        }, activeMonth: activeMonth, mode: range ? 'range' : 'single' }));
};
Calendar.displayName = 'Calendar';
export default Calendar;
//# sourceMappingURL=Calendar.js.map