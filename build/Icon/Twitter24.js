import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgTwitter24 = forwardRef(function SvgTwitter24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M23.954 4.323a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.691 7.848 4.066 5.884 1.64 2.915A4.822 4.822 0 0 0 .974 5.39c0 1.71.87 3.213 2.188 4.096A4.904 4.904 0 0 1 .934 8.87v.061a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.937 4.937 0 0 0 4.604 3.417 9.868 9.868 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 0 0 2.46-2.548l-.047-.02z', id: 'twitter24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'twitter24_svg__b' },
                React.createElement("use", { xlinkHref: '#twitter24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#twitter24_svg__a' }),
            React.createElement("g", { mask: 'url(#twitter24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgTwitter24.displayName = 'SvgTwitter24';
export default withStyles(styles)(SvgTwitter24);
//# sourceMappingURL=Twitter24.js.map