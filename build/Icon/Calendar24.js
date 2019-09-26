import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgCalendar24 = forwardRef(function SvgCalendar24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M5 4V2h1v2h12V2h1v2h5v18H0V4h5zm0 1H1v4h22V5h-4v2h-1V5H6v2H5V5zm18 5H1v11h22V10z', id: 'calendar24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'calendar24_svg__b' },
                React.createElement("use", { xlinkHref: '#calendar24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#calendar24_svg__a' }),
            React.createElement("g", { mask: 'url(#calendar24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgCalendar24.displayName = 'SvgCalendar24';
export default withStyles(styles)(SvgCalendar24);
//# sourceMappingURL=Calendar24.js.map