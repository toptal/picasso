import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 24;
const SvgVideoOff24 = forwardRef(function SvgVideoOff24(props, ref) {
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
            React.createElement("path", { d: 'M7.121 19l1-1H17V9.121l1-1v.45L24 6v12l-6-2.571V19H7.121zM2.88 19H0V5h16.879l-1 1H1v12h2.879l-1 1zM18 9.66v4.68l5 2.143V7.517l-5 2.142zM2.5 22.206l-.707-.707L21.5 1.793l.707.707L2.5 22.207z', id: 'videoOff24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'videoOff24_svg__b' },
                React.createElement("use", { xlinkHref: '#videoOff24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#videoOff24_svg__a' }),
            React.createElement("g", { mask: 'url(#videoOff24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgVideoOff24.displayName = 'SvgVideoOff24';
export default withStyles(styles)(SvgVideoOff24);
//# sourceMappingURL=VideoOff24.js.map