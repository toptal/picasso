import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgWorkExperience16 = forwardRef(function SvgWorkExperience16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M4 6v1H1v3h3v1H0V2h4V0h4v2h4v3h-1V3H1v3h3zm1-4h2V1H5v1zm2 13h7v1H7v-1zM5 6h11v8H5V6zm1 1v6h9V7H6z', id: 'workExperience16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'workExperience16_svg__b' },
                React.createElement("use", { xlinkHref: '#workExperience16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#workExperience16_svg__a' }),
            React.createElement("g", { mask: 'url(#workExperience16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgWorkExperience16.displayName = 'SvgWorkExperience16';
export default withStyles(styles)(SvgWorkExperience16);
//# sourceMappingURL=WorkExperience16.js.map