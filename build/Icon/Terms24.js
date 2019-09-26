import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgTerms24 = forwardRef(function SvgTerms24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M2 0h20v24H2V0zm1 1v22h18V1H3zm3 4h12v1H6V5zm0 3h12v1H6V8zm0 3h7v1H6v-1zm0 7h4v1H6v-1z', id: 'terms24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'terms24_svg__b' },
                React.createElement("use", { xlinkHref: '#terms24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#terms24_svg__a' }),
            React.createElement("g", { mask: 'url(#terms24_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgTerms24.displayName = 'SvgTerms24';
export default withStyles(styles)(SvgTerms24);
//# sourceMappingURL=Terms24.js.map