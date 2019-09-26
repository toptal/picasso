import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgFilter24 = forwardRef(function SvgFilter24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M0 6h24v1H0V6zm6 12h12v1H6v-1zm15-6v1H3v-1h18z', id: 'filter24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'filter24_svg__b' },
                React.createElement("use", { xlinkHref: '#filter24_svg__a' })),
            React.createElement("use", { xlinkHref: '#filter24_svg__a' }),
            React.createElement("g", { mask: 'url(#filter24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgFilter24.displayName = 'SvgFilter24';
export default withStyles(styles)(SvgFilter24);
//# sourceMappingURL=Filter24.js.map