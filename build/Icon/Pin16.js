import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgPin16 = forwardRef(function SvgPin16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M8 16C4 11.542 2 8.21 2 6a6 6 0 1 1 12 0c0 2.21-2 5.542-6 10zM3 6c0 1.754 1.657 4.633 5 8.489 3.343-3.856 5-6.735 5-8.489A5 5 0 0 0 3 6zm5 2a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM7 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0z', id: 'pin16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'pin16_svg__b' },
                React.createElement("use", { xlinkHref: '#pin16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#pin16_svg__a' }),
            React.createElement("g", { mask: 'url(#pin16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgPin16.displayName = 'SvgPin16';
export default withStyles(styles)(SvgPin16);
//# sourceMappingURL=Pin16.js.map