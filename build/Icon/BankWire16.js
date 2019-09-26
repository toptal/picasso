import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgBankWire16 = forwardRef(function SvgBankWire16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M0 13h16v3H0v-3zm1 1v1h14v-1H1zM0 3l8-3 8 3v2H0V3zm1 .66V4h14v-.34L8 1.087 1 3.659zM3 6h1v6H3V6zm3 0h1v6H6V6zm3 0h1v6H9V6zm3 0h1v6h-1V6z', id: 'bankWire16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'bankWire16_svg__b' },
                React.createElement("use", { xlinkHref: '#bankWire16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#bankWire16_svg__a' }),
            React.createElement("g", { mask: 'url(#bankWire16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgBankWire16.displayName = 'SvgBankWire16';
export default withStyles(styles)(SvgBankWire16);
//# sourceMappingURL=BankWire16.js.map