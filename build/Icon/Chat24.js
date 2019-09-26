import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgChat24 = forwardRef(function SvgChat24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M11 16h1v1h7v2.586L21.586 17H23V9h-4V8h5v10h-2l-4 4v-4h-7v-2zM0 2h18v13H7v4l-4-4H0V2zm1 1v11h2.414L6 16.586V14h11V3H1z', id: 'chat24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'chat24_svg__b' },
                React.createElement("use", { xlinkHref: '#chat24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#chat24_svg__a' }),
            React.createElement("g", { mask: 'url(#chat24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgChat24.displayName = 'SvgChat24';
export default withStyles(styles)(SvgChat24);
//# sourceMappingURL=Chat24.js.map