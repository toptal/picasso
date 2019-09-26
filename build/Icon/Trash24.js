import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgTrash24 = forwardRef(function SvgTrash24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M9 3V0h6v3h8v1H1V3h8zm1 0h4V1h-4v2zm10 20V5h1v19H3V5h1v18h16zM9 10h1v8H9v-8zm5 0h1v8h-1v-8z', id: 'trash24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'trash24_svg__b' },
                React.createElement("use", { xlinkHref: '#trash24_svg__a' })),
            React.createElement("use", { xlinkHref: '#trash24_svg__a' }),
            React.createElement("g", { mask: 'url(#trash24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgTrash24.displayName = 'SvgTrash24';
export default withStyles(styles)(SvgTrash24);
//# sourceMappingURL=Trash24.js.map