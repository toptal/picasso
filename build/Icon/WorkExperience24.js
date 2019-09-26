import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgWorkExperience24 = forwardRef(function SvgWorkExperience24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M7 10v1H1v4h6v1H0V5h6V3h4v2h6v3h-1V6H1v4h6zm0-5h2V4H7v1zm1 4h16v10H8V9zm1 1v8h14v-8H9zm1 10h12v1H10v-1z', id: 'workExperience24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'workExperience24_svg__b' },
                React.createElement("use", { xlinkHref: '#workExperience24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#workExperience24_svg__a' }),
            React.createElement("g", { mask: 'url(#workExperience24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgWorkExperience24.displayName = 'SvgWorkExperience24';
export default withStyles(styles)(SvgWorkExperience24);
//# sourceMappingURL=WorkExperience24.js.map