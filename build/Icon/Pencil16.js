import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgPencil16 = forwardRef(function SvgPencil16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M11.5.793L15.207 4.5 4.707 15H1v-3.707L8.793 3.5V3.5l.707-.707 2-2zm-2 3.415l-7.5 7.5V14h2.293l7.499-7.5L9.5 4.208zm2-2L10.207 3.5l2.292 2.293L13.793 4.5 11.5 2.207z', id: 'pencil16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'pencil16_svg__b' },
                React.createElement("use", { xlinkHref: '#pencil16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#pencil16_svg__a' }),
            React.createElement("g", { mask: 'url(#pencil16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgPencil16.displayName = 'SvgPencil16';
export default withStyles(styles)(SvgPencil16);
//# sourceMappingURL=Pencil16.js.map