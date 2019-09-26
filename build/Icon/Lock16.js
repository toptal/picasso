import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgLock16 = forwardRef(function SvgLock16(props, ref) {
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
            React.createElement("path", { d: 'M4 7V4a4 4 0 1 1 8 0v3h2v9H2V7h2zm1 0h6V4a3 3 0 1 0-6 0v3zM4 8H3v7h10V8H4z', id: 'lock16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'lock16_svg__b' },
                React.createElement("use", { xlinkHref: '#lock16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#lock16_svg__a' }),
            React.createElement("g", { mask: 'url(#lock16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgLock16.displayName = 'SvgLock16';
export default withStyles(styles)(SvgLock16);
//# sourceMappingURL=Lock16.js.map