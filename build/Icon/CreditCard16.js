import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgCreditCard16 = forwardRef(function SvgCreditCard16(props, ref) {
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
            React.createElement("path", { d: 'M15 5V3H1v2h14zm0 1H1v7h14V6zM1 2h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm1 6h5v1H2V8zm0 2h3v1H2v-1zm9-2h3v1h-3V8z', id: 'creditCard16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'creditCard16_svg__b' },
                React.createElement("use", { xlinkHref: '#creditCard16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#creditCard16_svg__a' }),
            React.createElement("g", { mask: 'url(#creditCard16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgCreditCard16.displayName = 'SvgCreditCard16';
export default withStyles(styles)(SvgCreditCard16);
//# sourceMappingURL=CreditCard16.js.map