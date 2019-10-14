import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 24;
const SvgCode24 = forwardRef(function SvgCode24(props, ref) {
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
        React.createElement("path", { d: 'M1.655 12l5.054 6.067-.769.64L.354 12 5.94 5.295l.769.64L1.655 12zm20.699 0L17.3 5.936l.768-.64L23.655 12l-5.586 6.707-.769-.64L22.354 12zM9.87 23.102l-.973-.231L14.129.898l.973.231-5.231 21.973z' })));
});
SvgCode24.displayName = 'SvgCode24';
export default withStyles(styles)(SvgCode24);
//# sourceMappingURL=Code24.js.map