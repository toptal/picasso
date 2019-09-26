import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgFilter16 = forwardRef(function SvgFilter16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M0 4h16v1H0V4zm4 8h8v1H4v-1zm10-4v1H2V8h12z', id: 'filter16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'filter16_svg__b' },
                React.createElement("use", { xlinkHref: '#filter16_svg__a' })),
            React.createElement("use", { xlinkHref: '#filter16_svg__a' }),
            React.createElement("g", { mask: 'url(#filter16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgFilter16.displayName = 'SvgFilter16';
export default withStyles(styles)(SvgFilter16);
//# sourceMappingURL=Filter16.js.map