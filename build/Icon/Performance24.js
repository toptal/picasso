import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgPerformance24 = forwardRef(function SvgPerformance24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M20 21h2v1H2v-1h2v-6h1v6h4V11h1v10h4V7h1v14h4V3h1v18z', id: 'performance24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'performance24_svg__b' },
                React.createElement("use", { xlinkHref: '#performance24_svg__a' })),
            React.createElement("use", { xlinkHref: '#performance24_svg__a' }),
            React.createElement("g", { mask: 'url(#performance24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgPerformance24.displayName = 'SvgPerformance24';
export default withStyles(styles)(SvgPerformance24);
//# sourceMappingURL=Performance24.js.map