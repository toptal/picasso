import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgBankWire24 = forwardRef(function SvgBankWire24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 32 32', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M2 26h28v4H2v-4zm1 1v2h26v-2H3zM2 8l14-6 14 6v3H2V8zm1 .66V10h26V8.66L16 3.087 3 8.659zM4 12h6v13H4V12zm1 1v11h4V13H5zm8-1h6v13h-6V12zm1 1v11h4V13h-4zm8-1h6v13h-6V12zm1 1v11h4V13h-4z', id: 'bankWire24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'bankWire24_svg__b' },
                React.createElement("use", { xlinkHref: '#bankWire24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#bankWire24_svg__a' }),
            React.createElement("g", { mask: 'url(#bankWire24_svg__b)' },
                React.createElement("path", { d: 'M0 0h32v32H0z' })))));
});
SvgBankWire24.displayName = 'SvgBankWire24';
export default withStyles(styles)(SvgBankWire24);
//# sourceMappingURL=BankWire24.js.map