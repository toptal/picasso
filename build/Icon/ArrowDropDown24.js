import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgArrowDropDown24 = forwardRef(function SvgArrowDropDown24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M11.372 16.215l-6.744-8.43C4.285 7.355 4.448 7 5 7h13.998c.556 0 .72.351.373.785l-6.744 8.43c-.343.43-.91.434-1.256 0z', id: 'arrowDropDown24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'arrowDropDown24_svg__b' },
                React.createElement("use", { xlinkHref: '#arrowDropDown24_svg__a' })),
            React.createElement("use", { xlinkHref: '#arrowDropDown24_svg__a' }),
            React.createElement("g", { mask: 'url(#arrowDropDown24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgArrowDropDown24.displayName = 'SvgArrowDropDown24';
export default withStyles(styles)(SvgArrowDropDown24);
//# sourceMappingURL=ArrowDropDown24.js.map