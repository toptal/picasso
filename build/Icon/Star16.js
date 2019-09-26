import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgStar16 = forwardRef(function SvgStar16(props, ref) {
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
            React.createElement("path", { d: 'M8 11.5l-4.114 2.163.785-4.581-3.328-3.245 4.6-.669L8 1l2.057 4.168 4.6.669-3.328 3.245.785 4.581L8 11.5zm0-1.13l2.786 1.465-.532-3.103 2.254-2.197-3.115-.453L8 3.26 6.607 6.082l-3.115.453 2.254 2.197-.532 3.103L8 10.37z', id: 'star16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'star16_svg__b' },
                React.createElement("use", { xlinkHref: '#star16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#star16_svg__a' }),
            React.createElement("g", { mask: 'url(#star16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgStar16.displayName = 'SvgStar16';
export default withStyles(styles)(SvgStar16);
//# sourceMappingURL=Star16.js.map