import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgJobChange16 = forwardRef(function SvgJobChange16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M6 7v1H1v3h5v1H0V3h4V1h4v2h4v2h-1V4H1v3h5zM5 3h2V2H5v1zm6.5 7.793l2-2 .707.707-2 2-.707.707L9.793 10.5l.707-.707 1 1zm0 4.207a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', id: 'jobChange16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'jobChange16_svg__b' },
                React.createElement("use", { xlinkHref: '#jobChange16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#jobChange16_svg__a' }),
            React.createElement("g", { mask: 'url(#jobChange16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgJobChange16.displayName = 'SvgJobChange16';
export default withStyles(styles)(SvgJobChange16);
//# sourceMappingURL=JobChange16.js.map