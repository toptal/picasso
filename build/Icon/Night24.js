import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgNight24 = forwardRef(function SvgNight24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M20 13v-1h1v1h1v1h-1v1h-1v-1h-1v-1h1zm-2-7V4h1v2h2v1h-2v2h-1V7h-2V6h2zM9 9a9 9 0 0 0 8.712 8.995 9 9 0 1 1-6.425-14.991A8.966 8.966 0 0 0 9 9zm-6 3a8 8 0 0 0 12.426 6.666C11.143 17.529 8 13.624 8 9c0-1.709.43-3.352 1.227-4.803A8.003 8.003 0 0 0 3 12z', id: 'night24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'night24_svg__b' },
                React.createElement("use", { xlinkHref: '#night24_svg__a' })),
            React.createElement("use", { xlinkHref: '#night24_svg__a' }),
            React.createElement("g", { mask: 'url(#night24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgNight24.displayName = 'SvgNight24';
export default withStyles(styles)(SvgNight24);
//# sourceMappingURL=Night24.js.map