import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgInfo24 = forwardRef(function SvgInfo24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M11.5 22C5.701 22 1 17.299 1 11.5S5.701 1 11.5 1 22 5.701 22 11.5 17.299 22 11.5 22zm0-1a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19zM11 9h1v8h-1V9zm0-3h1v1h-1V6z', id: 'info24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'info24_svg__b' },
                React.createElement("use", { xlinkHref: '#info24_svg__a' })),
            React.createElement("use", { xlinkHref: '#info24_svg__a' }),
            React.createElement("g", { mask: 'url(#info24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgInfo24.displayName = 'SvgInfo24';
export default withStyles(styles)(SvgInfo24);
//# sourceMappingURL=Info24.js.map