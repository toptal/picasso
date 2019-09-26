import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 32;
const SvgCreditCard32 = forwardRef(function SvgCreditCard32(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 32 32', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M31 10V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v3h30zm0 1H1v14a1 1 0 0 0 1 1h28a1 1 0 0 0 1-1V11zM2 5h28a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm2 11h10v1H4v-1zm0 4h5v1H4v-1zm19-4h5v1h-5v-1z', id: 'creditCard32_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'creditCard32_svg__b' },
                React.createElement("use", { xlinkHref: '#creditCard32_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#creditCard32_svg__a' }),
            React.createElement("g", { mask: 'url(#creditCard32_svg__b)' },
                React.createElement("path", { d: 'M0 0h32v32H0z' })))));
});
SvgCreditCard32.displayName = 'SvgCreditCard32';
export default withStyles(styles)(SvgCreditCard32);
//# sourceMappingURL=CreditCard32.js.map