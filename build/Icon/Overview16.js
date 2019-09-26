import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgOverview16 = forwardRef(function SvgOverview16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M0 13h16v1H0v-1zm0-5h16v1H0V8zm0-5h16v1H0V3z', id: 'overview16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'overview16_svg__b' },
                React.createElement("use", { xlinkHref: '#overview16_svg__a' })),
            React.createElement("use", { xlinkHref: '#overview16_svg__a' }),
            React.createElement("g", { mask: 'url(#overview16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgOverview16.displayName = 'SvgOverview16';
export default withStyles(styles)(SvgOverview16);
//# sourceMappingURL=Overview16.js.map