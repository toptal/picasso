import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgSearch24 = forwardRef(function SvgSearch24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M15.854 15.147l6.353 6.353-.707.707-6.353-6.353a8.5 8.5 0 1 1 .707-.707zM9.5 17a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z', id: 'search24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'search24_svg__b' },
                React.createElement("use", { xlinkHref: '#search24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#search24_svg__a' }),
            React.createElement("g", { mask: 'url(#search24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgSearch24.displayName = 'SvgSearch24';
export default withStyles(styles)(SvgSearch24);
//# sourceMappingURL=Search24.js.map