import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgSort16 = forwardRef(function SvgSort16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M5 5v8.292l2.5-2.5.707.708L4.5 15.207l-.707-.707-3-3 .707-.707 2.5 2.5V5h1zM11.5.793L15.207 4.5l-.707.707-2.5-2.5V11h-1V2.707l-2.5 2.5-.707-.707 3-3L11.5.793z', id: 'sort16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'sort16_svg__b' },
                React.createElement("use", { xlinkHref: '#sort16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#sort16_svg__a' }),
            React.createElement("g", { mask: 'url(#sort16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgSort16.displayName = 'SvgSort16';
export default withStyles(styles)(SvgSort16);
//# sourceMappingURL=Sort16.js.map