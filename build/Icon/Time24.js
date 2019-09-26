import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgTime24 = forwardRef(function SvgTime24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M11 12H6v-1h5V4h1v8h-1zm.5 10C5.701 22 1 17.299 1 11.5S5.701 1 11.5 1 22 5.701 22 11.5 17.299 22 11.5 22zm0-1a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19z', id: 'time24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'time24_svg__b' },
                React.createElement("use", { xlinkHref: '#time24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#time24_svg__a' }),
            React.createElement("g", { mask: 'url(#time24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgTime24.displayName = 'SvgTime24';
export default withStyles(styles)(SvgTime24);
//# sourceMappingURL=Time24.js.map