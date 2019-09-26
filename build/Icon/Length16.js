import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgLength16 = forwardRef(function SvgLength16(props, ref) {
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
            React.createElement("path", { d: 'M1 1v14H0V1h1zm15 0v14h-1V1h1zm-5.5 3.29l3 3 .707.707-3.707 3.707-.707-.707 2.999-3-3-3 .708-.707zm-5 0l.707.707-3 3 3 3-.707.707-3.707-3.707.707-.707 3-3z', id: 'length16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'length16_svg__b' },
                React.createElement("use", { xlinkHref: '#length16_svg__a' })),
            React.createElement("use", { xlinkHref: '#length16_svg__a' }),
            React.createElement("g", { mask: 'url(#length16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgLength16.displayName = 'SvgLength16';
export default withStyles(styles)(SvgLength16);
//# sourceMappingURL=Length16.js.map