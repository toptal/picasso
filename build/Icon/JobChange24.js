import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgJobChange24 = forwardRef(function SvgJobChange24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M14 12v1H1v5h13v1H0V6h7V3h6v3h7v5h-1V7H1v5h13zM8 6h4V4H8v2zm11.5 10.793l2-2 .707.707-2 2-.707.707-1.707-1.707.707-.707 1 1zm0 4.207a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', id: 'jobChange24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'jobChange24_svg__b' },
                React.createElement("use", { xlinkHref: '#jobChange24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#jobChange24_svg__a' }),
            React.createElement("g", { mask: 'url(#jobChange24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgJobChange24.displayName = 'SvgJobChange24';
export default withStyles(styles)(SvgJobChange24);
//# sourceMappingURL=JobChange24.js.map