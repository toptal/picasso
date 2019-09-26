import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgMorning24 = forwardRef(function SvgMorning24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M6.207 18a5.5 5.5 0 1 1 10.586 0h-1.05a4.5 4.5 0 1 0-8.488 0H6.208zM11 5h1v4h-1V5zm8.278 3.015l.707.707-2.828 2.828-.707-.707 2.828-2.828zM23 16v1h-4v-1h4zM0 17v-1h4v1H0zm3.015-8.278l.707-.707 2.828 2.828-.707.707-2.828-2.828z', id: 'morning24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'morning24_svg__b' },
                React.createElement("use", { xlinkHref: '#morning24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#morning24_svg__a' }),
            React.createElement("g", { mask: 'url(#morning24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgMorning24.displayName = 'SvgMorning24';
export default withStyles(styles)(SvgMorning24);
//# sourceMappingURL=Morning24.js.map