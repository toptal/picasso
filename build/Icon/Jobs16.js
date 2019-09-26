import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgJobs16 = forwardRef(function SvgJobs16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M10 5H1v4h14V5h-5zM6 4V2h4v2h6v11H0V4h6zm1 0h2V3H7v1zm8 6H1v4h14v-4z', id: 'jobs16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'jobs16_svg__b' },
                React.createElement("use", { xlinkHref: '#jobs16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#jobs16_svg__a' }),
            React.createElement("g", { mask: 'url(#jobs16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgJobs16.displayName = 'SvgJobs16';
export default withStyles(styles)(SvgJobs16);
//# sourceMappingURL=Jobs16.js.map