import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgUpdate16 = forwardRef(function SvgUpdate16(props, ref) {
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
            React.createElement("path", { d: 'M3.5 12.753V14.5h-1v-4h4v1H3.816A5.435 5.435 0 0 0 8 13.455 5.455 5.455 0 0 0 13.455 8h1.09A6.545 6.545 0 0 1 3.5 12.753zm9-9.506V1.5h1v4h-4v-1h2.684A5.435 5.435 0 0 0 8 2.545 5.455 5.455 0 0 0 2.545 8h-1.09A6.545 6.545 0 0 1 12.5 3.247z', id: 'update16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'update16_svg__b' },
                React.createElement("use", { xlinkHref: '#update16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#update16_svg__a' }),
            React.createElement("g", { mask: 'url(#update16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgUpdate16.displayName = 'SvgUpdate16';
export default withStyles(styles)(SvgUpdate16);
//# sourceMappingURL=Update16.js.map