import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 24;
const SvgChat24 = forwardRef(function SvgChat24(props, ref) {
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
        React.createElement("path", { d: 'M11 16h1v1h7v2.586L21.586 17H23V9h-4V8h5v10h-2l-4 4v-4h-7v-2zM0 2h18v13H7v4l-4-4H0V2zm1 1v11h2.414L6 16.586V14h11V3H1z' })));
});
SvgChat24.displayName = 'SvgChat24';
export default withStyles(styles)(SvgChat24);
//# sourceMappingURL=Chat24.js.map