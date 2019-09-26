import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgUploadDocument16 = forwardRef(function SvgUploadDocument16(props, ref) {
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
            React.createElement("path", { d: 'M1 15h7v1H0V0h13v8h-1V1H1v14zm12-3.293V16h-1v-4.293l-1.5 1.5-.707-.707L12.5 9.793l.707.707 2 2-.707.707-1.5-1.5zM3 4h7v1H3V4zm0 2h7v1H3V6zm0 2h3v1H3V8z', id: 'uploadDocument16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'uploadDocument16_svg__b' },
                React.createElement("use", { xlinkHref: '#uploadDocument16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#uploadDocument16_svg__a' }),
            React.createElement("g", { mask: 'url(#uploadDocument16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgUploadDocument16.displayName = 'SvgUploadDocument16';
export default withStyles(styles)(SvgUploadDocument16);
//# sourceMappingURL=UploadDocument16.js.map