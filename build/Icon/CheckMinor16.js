import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgCheckMinor16 = forwardRef(function SvgCheckMinor16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M6.5 9.793l4-4 .707.707-4 4-.707.707L3.793 8.5l.707-.707 2 2z', id: 'checkMinor16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'checkMinor16_svg__b' },
                React.createElement("use", { xlinkHref: '#checkMinor16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#checkMinor16_svg__a' }),
            React.createElement("g", { mask: 'url(#checkMinor16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgCheckMinor16.displayName = 'SvgCheckMinor16';
export default withStyles(styles)(SvgCheckMinor16);
//# sourceMappingURL=CheckMinor16.js.map