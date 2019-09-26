import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgCloseMinor16 = forwardRef(function SvgCloseMinor16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M8.707 8l3.5 3.5-.707.707-3.5-3.5-3.5 3.5-.707-.707 3.5-3.5-3.5-3.5.707-.707 3.5 3.5 3.5-3.5.707.707-3.5 3.5z', id: 'closeMinor16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'closeMinor16_svg__b' },
                React.createElement("use", { xlinkHref: '#closeMinor16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#closeMinor16_svg__a' }),
            React.createElement("g", { mask: 'url(#closeMinor16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgCloseMinor16.displayName = 'SvgCloseMinor16';
export default withStyles(styles)(SvgCloseMinor16);
//# sourceMappingURL=CloseMinor16.js.map