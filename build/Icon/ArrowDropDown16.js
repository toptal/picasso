import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgArrowDropDown16 = forwardRef(function SvgArrowDropDown16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M7.357 10.228L3.643 5.772C3.283 5.34 3.446 5 3.995 5h8.01c.54 0 .707.346.352.772l-3.714 4.456c-.36.432-.931.426-1.286 0z', id: 'arrowDropDown16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'arrowDropDown16_svg__b' },
                React.createElement("use", { xlinkHref: '#arrowDropDown16_svg__a' })),
            React.createElement("use", { xlinkHref: '#arrowDropDown16_svg__a' }),
            React.createElement("g", { mask: 'url(#arrowDropDown16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgArrowDropDown16.displayName = 'SvgArrowDropDown16';
export default withStyles(styles)(SvgArrowDropDown16);
//# sourceMappingURL=ArrowDropDown16.js.map