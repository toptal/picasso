import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgView16 = forwardRef(function SvgView16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M2 15H1V1h6v1H2v12h12V9h1v6H2zM14 2.707l-5.5 5.5-.707-.707 5.5-5.5H10V1h5v5h-1V2.707z', id: 'view16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'view16_svg__b' },
                React.createElement("use", { xlinkHref: '#view16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#view16_svg__a' }),
            React.createElement("g", { mask: 'url(#view16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgView16.displayName = 'SvgView16';
export default withStyles(styles)(SvgView16);
//# sourceMappingURL=View16.js.map