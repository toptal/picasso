import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgAfternoon24 = forwardRef(function SvgAfternoon24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M11.5 17a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-1a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM11 0h1v4h-1V0zm8.278 3.015l.707.707-2.828 2.828-.707-.707 2.828-2.828zM23 11v1h-4v-1h4zm-3.015 8.278l-.707.707-2.828-2.828.707-.707 2.828 2.828zM12 23h-1v-4h1v4zm-8.278-3.015l-.707-.707 2.828-2.828.707.707-2.828 2.828zM0 12v-1h4v1H0zm3.015-8.278l.707-.707L6.55 5.843l-.707.707-2.828-2.828z', id: 'afternoon24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'afternoon24_svg__b' },
                React.createElement("use", { xlinkHref: '#afternoon24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#afternoon24_svg__a' }),
            React.createElement("g", { mask: 'url(#afternoon24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgAfternoon24.displayName = 'SvgAfternoon24';
export default withStyles(styles)(SvgAfternoon24);
//# sourceMappingURL=Afternoon24.js.map