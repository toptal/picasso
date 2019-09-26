import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgVideoOn16 = forwardRef(function SvgVideoOn16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M12 5.6L16 4v8l-4-1.6V13H0V3h12v2.6zm0 1.077v2.646l3 1.2V5.477l-3 1.2zM11 6V4H1v8h10V6z', id: 'videoOn16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'videoOn16_svg__b' },
                React.createElement("use", { xlinkHref: '#videoOn16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#videoOn16_svg__a' }),
            React.createElement("g", { mask: 'url(#videoOn16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgVideoOn16.displayName = 'SvgVideoOn16';
export default withStyles(styles)(SvgVideoOn16);
//# sourceMappingURL=VideoOn16.js.map