import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
export const Indicator = forwardRef(function Indicator({ classes, className, color, style }, ref) {
    return (React.createElement("div", { className: cx(classes.root, className, classes[color]), style: style, ref: ref }));
});
Indicator.displayName = 'Indicator';
export default withStyles(styles)(Indicator);
//# sourceMappingURL=Indicator.js.map