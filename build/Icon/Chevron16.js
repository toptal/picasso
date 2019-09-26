import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgChevron16 = forwardRef(function SvgChevron16(props, ref) {
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
        React.createElement("defs", null,
            React.createElement("path", { d: 'M4.997 1.29l6.707 6.707-.707.707-6 6-.707-.707 6-6-6-6 .707-.707z', id: 'chevron16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'chevron16_svg__b' },
                React.createElement("use", { xlinkHref: '#chevron16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#chevron16_svg__a' }),
            React.createElement("g", { mask: 'url(#chevron16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgChevron16.displayName = 'SvgChevron16';
export default withStyles(styles)(SvgChevron16);
//# sourceMappingURL=Chevron16.js.map