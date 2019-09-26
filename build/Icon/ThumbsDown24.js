import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgThumbsDown24 = forwardRef(function SvgThumbsDown24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M11.23 1c2.448-.001 3.9.495 6.356 1.487h3.943A1.48 1.48 0 0 1 23 3.975v8.923a1.48 1.48 0 0 1-1.471 1.487h-3.605L13.3 22.25a1.464 1.464 0 0 1-1.742.674l-1.063-.359a2.544 2.544 0 0 1-1.643-3.025l.944-3.808-2.592.475c-2.398.44-4.696-1.167-5.132-3.592a4.51 4.51 0 0 1 0-1.596l.924-5.134C3.503 3.056 5.94 1 8.785 1h2.445zm0 1H8.785C6.427 2 4.402 3.708 3.979 6.062l-.924 5.134a3.51 3.51 0 0 0 0 1.242c.339 1.882 2.116 3.126 3.968 2.786l4.115-.755-.372 1.503-.944 3.809c-.194.783.24 1.584.991 1.837l1.063.358a.47.47 0 0 0 .561-.232L17 13.982V3.329l-.141-.056C14.339 2.27 13.187 2 11.229 2zM18 13.385h3.529a.48.48 0 0 0 .471-.487V3.975a.48.48 0 0 0-.471-.488H18v9.898z', id: 'thumbsDown24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'thumbsDown24_svg__b' },
                React.createElement("use", { xlinkHref: '#thumbsDown24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#thumbsDown24_svg__a' }),
            React.createElement("g", { mask: 'url(#thumbsDown24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgThumbsDown24.displayName = 'SvgThumbsDown24';
export default withStyles(styles)(SvgThumbsDown24);
//# sourceMappingURL=ThumbsDown24.js.map