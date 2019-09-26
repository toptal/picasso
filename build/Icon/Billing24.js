import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 24;
const SvgBilling24 = forwardRef(function SvgBilling24(props, ref) {
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
            React.createElement("path", { d: 'M16 0l6 6v18H2V0h14zm-.414 1H3v22h18V6.414L15.586 1zM6 8h3v1H6V8zm0 4h3v1H6v-1zm6-4h6v1h-6V8zm0 4h6v1h-6v-1zm0 4h6v1h-6v-1z', id: 'billing24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'billing24_svg__b' },
                React.createElement("use", { xlinkHref: '#billing24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#billing24_svg__a' }),
            React.createElement("g", { mask: 'url(#billing24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgBilling24.displayName = 'SvgBilling24';
export default withStyles(styles)(SvgBilling24);
//# sourceMappingURL=Billing24.js.map