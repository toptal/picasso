import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgVideoOff16 = forwardRef(function SvgVideoOff16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M12.869 5.252L16 4v8l-4-1.6V13H5.121l1-1H11V7.121l1.869-1.869zM.879 13H0V3h10.879l-1 1H1v8h.879l-1 1zM12 6.677v2.646l3 1.2V5.477l-3 1.2zm-10.5 8.53L.793 14.5 14.5.793l.707.707L1.5 15.207z', id: 'videoOff16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'videoOff16_svg__b' },
                React.createElement("use", { xlinkHref: '#videoOff16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#videoOff16_svg__a' }),
            React.createElement("g", { mask: 'url(#videoOff16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgVideoOff16.displayName = 'SvgVideoOff16';
export default withStyles(styles)(SvgVideoOff16);
//# sourceMappingURL=VideoOff16.js.map