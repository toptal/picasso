import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgArrowDropUp24 = forwardRef(function SvgArrowDropUp24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M11.372 7.785c.347-.434.913-.43 1.256 0l6.744 8.43c.347.434.183.785-.373.785H5.001c-.553 0-.716-.356-.373-.785l6.744-8.43z', id: 'arrowDropUp24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'arrowDropUp24_svg__b' },
                React.createElement("use", { xlinkHref: '#arrowDropUp24_svg__a' })),
            React.createElement("use", { xlinkHref: '#arrowDropUp24_svg__a' }),
            React.createElement("g", { mask: 'url(#arrowDropUp24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgArrowDropUp24.displayName = 'SvgArrowDropUp24';
export default withStyles(styles)(SvgArrowDropUp24);
//# sourceMappingURL=ArrowDropUp24.js.map