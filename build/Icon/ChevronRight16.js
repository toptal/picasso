import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgChevronRight16 = forwardRef(function SvgChevronRight16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M10.5 6.793l.707.707L6.5 12.207l-.707-.707 4-4-4-4 .707-.707 4 4z', id: 'chevronRight16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'chevronRight16_svg__b' },
                React.createElement("use", { xlinkHref: '#chevronRight16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#chevronRight16_svg__a' }),
            React.createElement("g", { mask: 'url(#chevronRight16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgChevronRight16.displayName = 'SvgChevronRight16';
export default withStyles(styles)(SvgChevronRight16);
//# sourceMappingURL=ChevronRight16.js.map