import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgNewCandidate16 = forwardRef(function SvgNewCandidate16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M13 3V1h1v2h2v1h-2v2h-1V4h-2V3h2zM3.873 9.388a4 4 0 1 1 4.255 0A6.002 6.002 0 0 1 12 15h-1a5 5 0 0 0-10 0H0a6.002 6.002 0 0 1 3.873-5.612zM6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', id: 'newCandidate16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'newCandidate16_svg__b' },
                React.createElement("use", { xlinkHref: '#newCandidate16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#newCandidate16_svg__a' }),
            React.createElement("g", { mask: 'url(#newCandidate16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgNewCandidate16.displayName = 'SvgNewCandidate16';
export default withStyles(styles)(SvgNewCandidate16);
//# sourceMappingURL=NewCandidate16.js.map