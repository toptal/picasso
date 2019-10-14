import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgCloseMinor16 = forwardRef(function SvgCloseMinor16(props, ref) {
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
        React.createElement("path", { d: 'M8.707 8l3.5 3.5-.707.707-3.5-3.5-3.5 3.5-.707-.707 3.5-3.5-3.5-3.5.707-.707 3.5 3.5 3.5-3.5.707.707-3.5 3.5z' })));
});
SvgCloseMinor16.displayName = 'SvgCloseMinor16';
export default withStyles(styles)(SvgCloseMinor16);
//# sourceMappingURL=CloseMinor16.js.map