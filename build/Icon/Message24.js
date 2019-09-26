import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgMessage24 = forwardRef(function SvgMessage24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M8 18l-5 5v-5H1V1h22v17H8zm-4 2.586L7.586 17H22V2H2v15h2v3.586z', id: 'message24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'message24_svg__b' },
                React.createElement("use", { xlinkHref: '#message24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#message24_svg__a' }),
            React.createElement("g", { mask: 'url(#message24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgMessage24.displayName = 'SvgMessage24';
export default withStyles(styles)(SvgMessage24);
//# sourceMappingURL=Message24.js.map