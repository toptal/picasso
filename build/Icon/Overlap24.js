import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgOverlap24 = forwardRef(function SvgOverlap24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M18 2H2v16H1V1h17v1zm4 4h1v17H6v-1h16V6zM6 6h12v12H6V6zm1 1v10h10V7H7z', id: 'overlap24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'overlap24_svg__b' },
                React.createElement("use", { xlinkHref: '#overlap24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#overlap24_svg__a' }),
            React.createElement("g", { mask: 'url(#overlap24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgOverlap24.displayName = 'SvgOverlap24';
export default withStyles(styles)(SvgOverlap24);
//# sourceMappingURL=Overlap24.js.map