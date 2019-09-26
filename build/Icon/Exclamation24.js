import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgExclamation24 = forwardRef(function SvgExclamation24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M11.5 22C5.701 22 1 17.299 1 11.5S5.701 1 11.5 1 22 5.701 22 11.5 17.299 22 11.5 22zm0-1a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19zM11 6h1v8h-1V6zm0 10h1v1h-1v-1z', id: 'exclamation24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'exclamation24_svg__b' },
                React.createElement("use", { xlinkHref: '#exclamation24_svg__a' })),
            React.createElement("use", { xlinkHref: '#exclamation24_svg__a' }),
            React.createElement("g", { mask: 'url(#exclamation24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgExclamation24.displayName = 'SvgExclamation24';
export default withStyles(styles)(SvgExclamation24);
//# sourceMappingURL=Exclamation24.js.map