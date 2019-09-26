import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgDone24 = forwardRef(function SvgDone24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M10.5 14.793l6-6 .707.707-6 6-.707.707L6.793 12.5l.707-.707 3 3zM12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm0-1c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z', id: 'done24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'done24_svg__b' },
                React.createElement("use", { xlinkHref: '#done24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#done24_svg__a' }),
            React.createElement("g", { mask: 'url(#done24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgDone24.displayName = 'SvgDone24';
export default withStyles(styles)(SvgDone24);
//# sourceMappingURL=Done24.js.map