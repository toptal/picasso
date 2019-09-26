import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgBilling16 = forwardRef(function SvgBilling16(props, ref) {
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
            React.createElement("path", { d: 'M11 0l4 4v12H1V0h10zm-.414 1H2v14h12V4.414L10.586 1zM4 5h2v1H4V5zm0 3h2v1H4V8zm4-3h4v1H8V5zm0 3h4v1H8V8zm0 3h4v1H8v-1z', id: 'billing16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'billing16_svg__b' },
                React.createElement("use", { xlinkHref: '#billing16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#billing16_svg__a' }),
            React.createElement("g", { mask: 'url(#billing16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgBilling16.displayName = 'SvgBilling16';
export default withStyles(styles)(SvgBilling16);
//# sourceMappingURL=Billing16.js.map