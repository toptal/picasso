import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgDone16 = forwardRef(function SvgDone16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M6.5 9.793l5-5 .707.707-5 5-.707.707L3.793 8.5l.707-.707 2 2zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14z', id: 'done16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'done16_svg__b' },
                React.createElement("use", { xlinkHref: '#done16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#done16_svg__a' }),
            React.createElement("g", { mask: 'url(#done16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgDone16.displayName = 'SvgDone16';
export default withStyles(styles)(SvgDone16);
//# sourceMappingURL=Done16.js.map