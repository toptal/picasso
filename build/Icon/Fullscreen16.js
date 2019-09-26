import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgFullscreen16 = forwardRef(function SvgFullscreen16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M3 11h2v1H2V9h1v2zm11-6v2h-1V5h-2V4h3v1zM0 2h16v12H0V2zm1 1v10h14V3H1z', id: 'fullscreen16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'fullscreen16_svg__b' },
                React.createElement("use", { xlinkHref: '#fullscreen16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#fullscreen16_svg__a' }),
            React.createElement("g", { mask: 'url(#fullscreen16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgFullscreen16.displayName = 'SvgFullscreen16';
export default withStyles(styles)(SvgFullscreen16);
//# sourceMappingURL=Fullscreen16.js.map