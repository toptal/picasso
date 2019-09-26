import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgRepresentatives16 = forwardRef(function SvgRepresentatives16(props, ref) {
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
            React.createElement("path", { d: 'M2 0h12v16l-6-4.005L2 16V0zm1 1v13.13l5-3.337 5 3.337V1H3z', id: 'representatives16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'representatives16_svg__b' },
                React.createElement("use", { xlinkHref: '#representatives16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#representatives16_svg__a' }),
            React.createElement("g", { mask: 'url(#representatives16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgRepresentatives16.displayName = 'SvgRepresentatives16';
export default withStyles(styles)(SvgRepresentatives16);
//# sourceMappingURL=Representatives16.js.map