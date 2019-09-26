import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgLock24 = forwardRef(function SvgLock24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M6 10V6a6 6 0 1 1 12 0v4h3v14H3V10h3zm1 0h10V6A5 5 0 0 0 7 6v4zm-1 1H4v12h16V11H6z', id: 'lock24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'lock24_svg__b' },
                React.createElement("use", { xlinkHref: '#lock24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#lock24_svg__a' }),
            React.createElement("g", { mask: 'url(#lock24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgLock24.displayName = 'SvgLock24';
export default withStyles(styles)(SvgLock24);
//# sourceMappingURL=Lock24.js.map