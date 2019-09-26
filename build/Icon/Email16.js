import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgEmail16 = forwardRef(function SvgEmail16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M1.768 3L8 8.342 14.232 3H1.768zM15 3.659l-7 6-7-6V13h14V3.659zM0 2h16v12H0V2z', id: 'email16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'email16_svg__b' },
                React.createElement("use", { xlinkHref: '#email16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#email16_svg__a' }),
            React.createElement("g", { mask: 'url(#email16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgEmail16.displayName = 'SvgEmail16';
export default withStyles(styles)(SvgEmail16);
//# sourceMappingURL=Email16.js.map