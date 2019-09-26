import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgArrowUpMinor16 = forwardRef(function SvgArrowUpMinor16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M7.997 5.29l4.707 4.707-.707.707-4-4-4 4-.707-.707 4-4 .707-.707z', id: 'arrowUpMinor16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'arrowUpMinor16_svg__b' },
                React.createElement("use", { xlinkHref: '#arrowUpMinor16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#arrowUpMinor16_svg__a' }),
            React.createElement("g", { mask: 'url(#arrowUpMinor16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgArrowUpMinor16.displayName = 'SvgArrowUpMinor16';
export default withStyles(styles)(SvgArrowUpMinor16);
//# sourceMappingURL=ArrowUpMinor16.js.map