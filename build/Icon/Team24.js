import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgTeam24 = forwardRef(function SvgTeam24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M3.95 16L8 7.388V0h8v7.388L20.056 16H24v8h-8v-4H8v4H0v-8h3.95zm1.105 0H8v3h8v-3H18.951l-3.768-8H8.817l-3.762 8zM7 20v-3H1v6h6v-3zm10-1v4h6v-6h-6v2zM9 7h6V1H9v6z', id: 'team24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'team24_svg__b' },
                React.createElement("use", { xlinkHref: '#team24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#team24_svg__a' }),
            React.createElement("g", { mask: 'url(#team24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgTeam24.displayName = 'SvgTeam24';
export default withStyles(styles)(SvgTeam24);
//# sourceMappingURL=Team24.js.map