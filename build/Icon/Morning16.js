import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgMorning16 = forwardRef(function SvgMorning16(props, ref) {
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
        React.createElement("path", { d: 'M4.337 12a3.5 3.5 0 1 1 6.326 0H9.5a2.5 2.5 0 1 0-4 0H4.337zM7 3h1v3H7V3zm5.45 1.843l.707.707-2.121 2.122-.708-.708 2.122-2.12zM15 10v1h-3v-1h3zM0 11v-1h3v1H0zm1.843-5.45l.707-.707 2.122 2.121-.708.708-2.12-2.122z' })));
});
SvgMorning16.displayName = 'SvgMorning16';
export default withStyles(styles)(SvgMorning16);
//# sourceMappingURL=Morning16.js.map