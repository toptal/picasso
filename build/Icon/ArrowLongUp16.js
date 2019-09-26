import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgArrowLongUp16 = forwardRef(function SvgArrowLongUp16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M7.5 1.793L11.207 5.5l-.707.707-2.5-2.5V14H7V3.707l-2.5 2.5-.707-.707 3-3 .707-.707z', id: 'arrowLongUp16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'arrowLongUp16_svg__b' },
                React.createElement("use", { xlinkHref: '#arrowLongUp16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#arrowLongUp16_svg__a' }),
            React.createElement("g", { mask: 'url(#arrowLongUp16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgArrowLongUp16.displayName = 'SvgArrowLongUp16';
export default withStyles(styles)(SvgArrowLongUp16);
//# sourceMappingURL=ArrowLongUp16.js.map