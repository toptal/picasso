import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgThumbsUp16 = forwardRef(function SvgThumbsUp16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M8.778.26L9.5.5a1.707 1.707 0 0 1 1.117 2.034l-.642 2.56 1.762-.319a3 3 0 0 1 3.488 3.488l-.628 3.453A4 4 0 0 1 10.662 15H9c-1.664 0-3.33-.333-5-1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2.45L7.593.712A1 1 0 0 1 8.778.259zm-.316.948l-.01.015L5.02 7 5 6.999v6.307c1.341.464 2.673.695 4 .694h1.662a3 3 0 0 0 2.951-2.463l.628-3.452a2 2 0 0 0-2.326-2.326l-3.287.596.377-1.503.641-2.56a.707.707 0 0 0-.462-.843l-.722-.241zM4 13V6.999L2 7v6h2z', id: 'thumbsUp16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'thumbsUp16_svg__b' },
                React.createElement("use", { xlinkHref: '#thumbsUp16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#thumbsUp16_svg__a' }),
            React.createElement("g", { mask: 'url(#thumbsUp16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgThumbsUp16.displayName = 'SvgThumbsUp16';
export default withStyles(styles)(SvgThumbsUp16);
//# sourceMappingURL=ThumbsUp16.js.map