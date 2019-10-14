import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgEvening16 = forwardRef(function SvgEvening16(props, ref) {
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
        React.createElement("path", { d: 'M14 12v-1h1v1h1v1h-1v1h-1v-1h-1v-1h1zM7 9V8h1v1h1v1H8v1H7v-1H6V9h1zm5-4V3h1v2h2v1h-2v2h-1V6h-2V5h2zM2 13v-2h1v2h2v1H3v2H2v-2H0v-1h2zM5 2h2v1H5v2H4V3H2V2h2V0h1v2z' })));
});
SvgEvening16.displayName = 'SvgEvening16';
export default withStyles(styles)(SvgEvening16);
//# sourceMappingURL=Evening16.js.map