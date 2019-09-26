import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgDownload16 = forwardRef(function SvgDownload16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M8 10.293l2.5-2.5.707.707L7.5 12.207 3.793 8.5l.707-.707 2.5 2.5V1h1v9.293zM15 14v1H0v-3h1v2h13v-2h1v2z', id: 'download16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'download16_svg__b' },
                React.createElement("use", { xlinkHref: '#download16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#download16_svg__a' }),
            React.createElement("g", { mask: 'url(#download16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgDownload16.displayName = 'SvgDownload16';
export default withStyles(styles)(SvgDownload16);
//# sourceMappingURL=Download16.js.map