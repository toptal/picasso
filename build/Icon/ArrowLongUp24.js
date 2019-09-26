import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 24;
const SvgArrowLongUp24 = forwardRef(function SvgArrowLongUp24(props, ref) {
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
        React.createElement("defs", null,
            React.createElement("path", { d: 'M11.5 2.793L17.207 8.5l-.707.707-4.5-4.5V21h-1V4.707l-4.5 4.5-.707-.707L11.5 2.793z', id: 'arrowLongUp24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'arrowLongUp24_svg__b' },
                React.createElement("use", { xlinkHref: '#arrowLongUp24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#arrowLongUp24_svg__a' }),
            React.createElement("g", { mask: 'url(#arrowLongUp24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgArrowLongUp24.displayName = 'SvgArrowLongUp24';
export default withStyles(styles)(SvgArrowLongUp24);
//# sourceMappingURL=ArrowLongUp24.js.map