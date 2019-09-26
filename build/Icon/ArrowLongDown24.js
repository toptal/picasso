import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 24;
const SvgArrowLongDown24 = forwardRef(function SvgArrowLongDown24(props, ref) {
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
            React.createElement("path", { d: 'M12 3v16.291l4.5-4.498.707.707-5.707 5.707L5.793 15.5l.707-.707 4.5 4.499V3h1z', id: 'arrowLongDown24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'arrowLongDown24_svg__b' },
                React.createElement("use", { xlinkHref: '#arrowLongDown24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#arrowLongDown24_svg__a' }),
            React.createElement("g", { mask: 'url(#arrowLongDown24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgArrowLongDown24.displayName = 'SvgArrowLongDown24';
export default withStyles(styles)(SvgArrowLongDown24);
//# sourceMappingURL=ArrowLongDown24.js.map