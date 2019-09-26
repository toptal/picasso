import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgLeave16 = forwardRef(function SvgLeave16(props, ref) {
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
            React.createElement("path", { d: 'M1 2v13h4v1H0V1h5v1H1zm12.293 7H5V8h8.293l-2.5-2.5.707-.707 3 3 .707.707-3.707 3.707-.707-.707 2.5-2.5z', id: 'leave16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'leave16_svg__b' },
                React.createElement("use", { xlinkHref: '#leave16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#leave16_svg__a' }),
            React.createElement("g", { mask: 'url(#leave16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgLeave16.displayName = 'SvgLeave16';
export default withStyles(styles)(SvgLeave16);
//# sourceMappingURL=Leave16.js.map