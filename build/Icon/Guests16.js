import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgGuests16 = forwardRef(function SvgGuests16(props, ref) {
    const { classes: availableClasses, className, style = {}, color, scale, base } = props;
    const classes = [availableClasses.root, className];
    let svgColor;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const colorClassName = kebabToCamelCase(`${color}`);
    if (!availableClasses[`${colorClassName}`]) {
        svgColor = color;
    }
    else {
        classes.push(availableClasses[colorClassName]);
    }
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(...classes), style: svgStyle, color: svgColor, ref: ref },
        React.createElement("path", { d: 'M4 1v1H3v13h10V2h-1V1h2v15H2V1h2zm6 11v1H6v-1h4zM8 5a2 2 0 0 1 1.452 3.375 2.998 2.998 0 0 1 1.542 2.427L11 11h-1a2 2 0 0 0-3.995-.15L6 11H5a3 3 0 0 1 1.549-2.626A2 2 0 0 1 8 5zm0 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3-6v3H5V0h6zm-1 1H6v1h4V1z' })));
});
SvgGuests16.displayName = 'SvgGuests16';
export default withStyles(styles)(SvgGuests16);
//# sourceMappingURL=Guests16.js.map