import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgCode16 = forwardRef(function SvgCode16(props, ref) {
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
            React.createElement("path", { d: 'M1.63 8l3.074 4.103-.8.6L.38 8l3.525-4.7.8.6L1.63 8zm9.674 4.103L14.38 8l-3.075-4.1.8-.6L15.63 8l-3.524 4.702-.8-.6zM6.874 15.1l-.974-.225L9.125.9l.975.225L6.875 15.1z', id: 'code16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'code16_svg__b' },
                React.createElement("use", { xlinkHref: '#code16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#code16_svg__a' }),
            React.createElement("g", { mask: 'url(#code16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgCode16.displayName = 'SvgCode16';
export default withStyles(styles)(SvgCode16);
//# sourceMappingURL=Code16.js.map