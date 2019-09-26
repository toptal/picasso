import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgUiGuidelines16 = forwardRef(function SvgUiGuidelines16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M15 2h-5v12h5V2zm1 0v13H9V1h7v1zM0 3h7v1H0V3zm0 3h7v1H0V6zm0 3h7v1H0V9zm0 3h7v1H0v-1z', id: 'uiGuidelines16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'uiGuidelines16_svg__b' },
                React.createElement("use", { xlinkHref: '#uiGuidelines16_svg__a' })),
            React.createElement("use", { xlinkHref: '#uiGuidelines16_svg__a' }),
            React.createElement("g", { mask: 'url(#uiGuidelines16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgUiGuidelines16.displayName = 'SvgUiGuidelines16';
export default withStyles(styles)(SvgUiGuidelines16);
//# sourceMappingURL=UiGuidelines16.js.map