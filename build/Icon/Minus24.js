import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgMinus24 = forwardRef(function SvgMinus24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { id: 'minus24_svg__a', d: 'M4 11h15v1H4z' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'minus24_svg__b' },
                React.createElement("use", { xlinkHref: '#minus24_svg__a' })),
            React.createElement("use", { xlinkHref: '#minus24_svg__a' }),
            React.createElement("g", { mask: 'url(#minus24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgMinus24.displayName = 'SvgMinus24';
export default withStyles(styles)(SvgMinus24);
//# sourceMappingURL=Minus24.js.map