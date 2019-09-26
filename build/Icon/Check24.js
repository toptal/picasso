import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgCheck24 = forwardRef(function SvgCheck24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M7.5 18.793l14-14 .707.707-14 14-.707.707L1.793 14.5l.707-.707 5 5z', id: 'check24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'check24_svg__b' },
                React.createElement("use", { xlinkHref: '#check24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#check24_svg__a' }),
            React.createElement("g", { mask: 'url(#check24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgCheck24.displayName = 'SvgCheck24';
export default withStyles(styles)(SvgCheck24);
//# sourceMappingURL=Check24.js.map