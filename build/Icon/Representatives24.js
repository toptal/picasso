import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 24;
const SvgRepresentatives24 = forwardRef(function SvgRepresentatives24(props, ref) {
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
            React.createElement("path", { d: 'M3 0h18v24l-9-6.007L3 24V0zm1 1v21.13l8-5.34 8 5.34V1H4z', id: 'representatives24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'representatives24_svg__b' },
                React.createElement("use", { xlinkHref: '#representatives24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#representatives24_svg__a' }),
            React.createElement("g", { mask: 'url(#representatives24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgRepresentatives24.displayName = 'SvgRepresentatives24';
export default withStyles(styles)(SvgRepresentatives24);
//# sourceMappingURL=Representatives24.js.map