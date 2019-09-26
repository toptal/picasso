import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgPerformance16 = forwardRef(function SvgPerformance16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M13 14h2v1H1v-1h2V8h1v6h2V6h1v8h2V4h1v10h2V2h1v12z', id: 'performance16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'performance16_svg__b' },
                React.createElement("use", { xlinkHref: '#performance16_svg__a' })),
            React.createElement("use", { xlinkHref: '#performance16_svg__a' }),
            React.createElement("g", { mask: 'url(#performance16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgPerformance16.displayName = 'SvgPerformance16';
export default withStyles(styles)(SvgPerformance16);
//# sourceMappingURL=Performance16.js.map