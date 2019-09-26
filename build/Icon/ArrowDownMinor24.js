import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgArrowDownMinor24 = forwardRef(function SvgArrowDownMinor24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M18.007 8.3l.707.707-6 6-.707.707-.707-.707-6-6 .707-.707 6 6 6-6z', id: 'arrowDownMinor24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'arrowDownMinor24_svg__b' },
                React.createElement("use", { xlinkHref: '#arrowDownMinor24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#arrowDownMinor24_svg__a' }),
            React.createElement("g", { mask: 'url(#arrowDownMinor24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgArrowDownMinor24.displayName = 'SvgArrowDownMinor24';
export default withStyles(styles)(SvgArrowDownMinor24);
//# sourceMappingURL=ArrowDownMinor24.js.map