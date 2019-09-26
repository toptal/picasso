import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgCandidates24 = forwardRef(function SvgCandidates24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M24 17H11v6L0 17V2h24v15zM23 3H1v13.42l9 4.857V16h13V3z', id: 'candidates24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'candidates24_svg__b' },
                React.createElement("use", { xlinkHref: '#candidates24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#candidates24_svg__a' }),
            React.createElement("g", { mask: 'url(#candidates24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgCandidates24.displayName = 'SvgCandidates24';
export default withStyles(styles)(SvgCandidates24);
//# sourceMappingURL=Candidates24.js.map