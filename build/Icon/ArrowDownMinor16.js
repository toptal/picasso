import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgArrowDownMinor16 = forwardRef(function SvgArrowDownMinor16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M11.997 5.29l.707.707-4 4-.707.707-.707-.707-4-4 .707-.707 4 4 4-4z', id: 'arrowDownMinor16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'arrowDownMinor16_svg__b' },
                React.createElement("use", { xlinkHref: '#arrowDownMinor16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#arrowDownMinor16_svg__a' }),
            React.createElement("g", { mask: 'url(#arrowDownMinor16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgArrowDownMinor16.displayName = 'SvgArrowDownMinor16';
export default withStyles(styles)(SvgArrowDownMinor16);
//# sourceMappingURL=ArrowDownMinor16.js.map