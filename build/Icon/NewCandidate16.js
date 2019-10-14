import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgNewCandidate16 = forwardRef(function SvgNewCandidate16(props, ref) {
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
        React.createElement("path", { d: 'M13 3V1h1v2h2v1h-2v2h-1V4h-2V3h2zM3.873 9.388a4 4 0 1 1 4.255 0A6.002 6.002 0 0 1 12 15h-1a5 5 0 0 0-10 0H0a6.002 6.002 0 0 1 3.873-5.612zM6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' })));
});
SvgNewCandidate16.displayName = 'SvgNewCandidate16';
export default withStyles(styles)(SvgNewCandidate16);
//# sourceMappingURL=NewCandidate16.js.map