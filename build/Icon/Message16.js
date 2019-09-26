import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgMessage16 = forwardRef(function SvgMessage16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M6 12l-4 4v-4H0V0h16v12H6zm-3 1.586L5.586 11H15V1H1v10h2v2.586z', id: 'message16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'message16_svg__b' },
                React.createElement("use", { xlinkHref: '#message16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#message16_svg__a' }),
            React.createElement("g", { mask: 'url(#message16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgMessage16.displayName = 'SvgMessage16';
export default withStyles(styles)(SvgMessage16);
//# sourceMappingURL=Message16.js.map