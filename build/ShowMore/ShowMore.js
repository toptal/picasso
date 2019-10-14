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
import React, { forwardRef, useState } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Truncate from 'react-truncate';
import ChevronRightIcon16 from '../Icon/ChevronRight16';
import Typography from '../Typography';
import Link from '../Link';
import styles from './styles';
export const ShowMore = forwardRef(function ShowMore(_a, ref) {
    var { children, rows = 4, initialExpanded = false, disableToggle = false, classes: { expandedIcon, icon, toggleText, iconWrapper }, moreText = 'Show more', lessText = 'Show less', onToggle = () => { }, className, style } = _a, rest = __rest(_a, ["children", "rows", "initialExpanded", "disableToggle", "classes", "moreText", "lessText", "onToggle", "className", "style"]);
    const [shownMore, setShownMore] = useState(initialExpanded);
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography
        // eslint-disable-next-line react/jsx-props-no-spreading
        , Object.assign({}, rest, { ref: ref, size: 'medium', color: 'dark-grey', className: className, style: style }),
            React.createElement(Truncate, { lines: !shownMore && rows }, children)),
        !disableToggle && (React.createElement(Link, { onClick: () => {
                setShownMore(!shownMore);
                onToggle();
            }, className: toggleText, underline: 'none' },
            React.createElement(Typography, { size: 'medium', color: 'blue' }, shownMore ? lessText : moreText),
            React.createElement("div", { className: iconWrapper },
                React.createElement(ChevronRightIcon16, { className: cx(icon, {
                        [expandedIcon]: shownMore
                    }) }))))));
});
ShowMore.displayName = 'ShowMore';
export default withStyles(styles)(ShowMore);
//# sourceMappingURL=ShowMore.js.map