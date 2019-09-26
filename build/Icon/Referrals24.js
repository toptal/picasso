import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 24;
const SvgReferrals24 = forwardRef(function SvgReferrals24(props, ref) {
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
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(...classes), style: svgStyle, color: svgColor, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M21.5 10.793l.707.707-9.707 9.707-.707-.707 9-9-9-9 .707-.707 9 9zm-10 0l.707.707L2.5 21.207l-.707-.707 9-9-9-9 .707-.707 9 9z', id: 'referrals24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'referrals24_svg__b' },
                React.createElement("use", { xlinkHref: '#referrals24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#referrals24_svg__a' }),
            React.createElement("g", { mask: 'url(#referrals24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgReferrals24.displayName = 'SvgReferrals24';
export default withStyles(styles)(SvgReferrals24);
//# sourceMappingURL=Referrals24.js.map