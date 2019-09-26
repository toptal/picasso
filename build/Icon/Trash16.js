import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgTrash16 = forwardRef(function SvgTrash16(props, ref) {
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
            React.createElement("path", { d: 'M2 4h1v12H2V4zm0 11h12v1H2v-1zM6 2V0h4v2h5v1H1V2h5zm1 0h2V1H7v1zm6 2h1v12h-1V4zM6 7h1v5H6V7zm3 0h1v5H9V7z', id: 'trash16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'trash16_svg__b' },
                React.createElement("use", { xlinkHref: '#trash16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#trash16_svg__a' }),
            React.createElement("g", { mask: 'url(#trash16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgTrash16.displayName = 'SvgTrash16';
export default withStyles(styles)(SvgTrash16);
//# sourceMappingURL=Trash16.js.map