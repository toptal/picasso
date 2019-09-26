import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgDownload24 = forwardRef(function SvgDownload24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M12 17.293l3.5-3.5.707.707-4.707 4.707L6.793 14.5l.707-.707 3.5 3.5V2h1v15.293zM22 21v1H1v-4h1v3h19v-3h1v3z', id: 'download24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'download24_svg__b' },
                React.createElement("use", { xlinkHref: '#download24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#download24_svg__a' }),
            React.createElement("g", { mask: 'url(#download24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgDownload24.displayName = 'SvgDownload24';
export default withStyles(styles)(SvgDownload24);
//# sourceMappingURL=Download24.js.map