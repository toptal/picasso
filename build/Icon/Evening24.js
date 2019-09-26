import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 24;
const SvgEvening24 = forwardRef(function SvgEvening24(props, ref) {
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
            React.createElement("path", { d: 'M19 16v-1h1v1h1v1h-1v1h-1v-1h-1v-1h1zm-9-3v-1h1v1h1v1h-1v1h-1v-1H9v-1h1zm7-4V7h1v2h2v1h-2v2h-1v-2h-2V9h2zM5 17v-2h1v2h2v1H6v2H5v-2H3v-1h2zM9 6h2v1H9v2H8V7H6V6h2V4h1v2z', id: 'evening24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'evening24_svg__b' },
                React.createElement("use", { xlinkHref: '#evening24_svg__a' })),
            React.createElement("use", { xlinkHref: '#evening24_svg__a' }),
            React.createElement("g", { mask: 'url(#evening24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgEvening24.displayName = 'SvgEvening24';
export default withStyles(styles)(SvgEvening24);
//# sourceMappingURL=Evening24.js.map