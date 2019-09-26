import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgCandidates16 = forwardRef(function SvgCandidates16(props, ref) {
    const { classes: availableClasses, className, style = {}, color, scale, base } = props;
    const classes = [availableClasses.root, className];
    let svgColor;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const colorClassName = kebabToCamelCase(`${color}`);
    if (!availableClasses[`${colorClassName}`]) {
        svgColor = color;
    }
    else {
        classes.push(availableClasses[colorClassName]);
    }
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(...classes), style: svgStyle, color: svgColor, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M16 11H7v4l-7-4V1h16v10zm-1-9H1v8.42l5 2.857V10h9V2z', id: 'candidates16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'candidates16_svg__b' },
                React.createElement("use", { xlinkHref: '#candidates16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#candidates16_svg__a' }),
            React.createElement("g", { mask: 'url(#candidates16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgCandidates16.displayName = 'SvgCandidates16';
export default withStyles(styles)(SvgCandidates16);
//# sourceMappingURL=Candidates16.js.map