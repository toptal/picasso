import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgShare24 = forwardRef(function SvgShare24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M19 20v1H0V6h12v1H1v13h17v-9h1v9zM13 3h11v7H13V3zm1 1v5h9V4h-9z', id: 'share24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'share24_svg__b' },
                React.createElement("use", { xlinkHref: '#share24_svg__a' })),
            React.createElement("use", { xlinkHref: '#share24_svg__a' }),
            React.createElement("g", { mask: 'url(#share24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgShare24.displayName = 'SvgShare24';
export default withStyles(styles)(SvgShare24);
//# sourceMappingURL=Share24.js.map