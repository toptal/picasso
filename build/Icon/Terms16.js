import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgTerms16 = forwardRef(function SvgTerms16(props, ref) {
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
            React.createElement("path", { d: 'M1 0h14v16H1V0zm1 1v14h12V1H2zm2 2h8v1H4V3zm0 2h8v1H4V5zm0 2h5v1H4V7zm0 5h3v1H4v-1z', id: 'terms16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'terms16_svg__b' },
                React.createElement("use", { xlinkHref: '#terms16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#terms16_svg__a' }),
            React.createElement("g", { mask: 'url(#terms16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgTerms16.displayName = 'SvgTerms16';
export default withStyles(styles)(SvgTerms16);
//# sourceMappingURL=Terms16.js.map