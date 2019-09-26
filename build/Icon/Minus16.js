import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgMinus16 = forwardRef(function SvgMinus16(props, ref) {
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
            React.createElement("path", { id: 'minus16_svg__a', d: 'M2 7h11v1H2z' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'minus16_svg__b' },
                React.createElement("use", { xlinkHref: '#minus16_svg__a' })),
            React.createElement("use", { xlinkHref: '#minus16_svg__a' }),
            React.createElement("g", { mask: 'url(#minus16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgMinus16.displayName = 'SvgMinus16';
export default withStyles(styles)(SvgMinus16);
//# sourceMappingURL=Minus16.js.map