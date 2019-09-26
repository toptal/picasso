import React, { forwardRef, useState } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Truncate from 'react-truncate';
import ChevronRightIcon16 from '../Icon/ChevronRight16';
import Typography from '../Typography';
import Link from '../Link';
import styles from './styles';
export const ShowMore = forwardRef(function ShowMore({ children, rows = 4, initialExpanded = false, disableToggle = false, classes: { expandedIcon, icon, toggleText, iconWrapper }, moreText = 'Show more', lessText = 'Show less', onToggle = () => { } }, ref) {
    const [shownMore, setShownMore] = useState(initialExpanded);
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { ref: ref, size: 'medium', color: 'dark-grey' },
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