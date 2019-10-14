import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 24;
const SvgSearch24 = forwardRef(function SvgSearch24(props, ref) {
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
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(...classes), style: svgStyle, color: svgColor, ref: ref },
        React.createElement("path", { d: 'M15.854 15.147l6.353 6.353-.707.707-6.353-6.353a8.5 8.5 0 1 1 .707-.707zM9.5 17a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z' })));
});
SvgSearch24.displayName = 'SvgSearch24';
export default withStyles(styles)(SvgSearch24);
//# sourceMappingURL=Search24.js.map