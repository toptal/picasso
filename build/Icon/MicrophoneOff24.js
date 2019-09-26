import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 24;
const SvgMicrophoneOff24 = forwardRef(function SvgMicrophoneOff24(props, ref) {
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
            React.createElement("path", { d: 'M7.364 18.757l.724-.724A6.5 6.5 0 0 0 18 12.5h1a7.5 7.5 0 0 1-7 7.484V23h5v1H6v-1h5v-3.016a7.458 7.458 0 0 1-3.636-1.227zm-2.121-2.12A7.465 7.465 0 0 1 4 12.5h1c0 1.251.354 2.42.967 3.412l-.724.724zM16 5.878l-1 1V4.5a3.5 3.5 0 0 0-7 0v8c0 .413.071.809.203 1.176l-.764.764A4.482 4.482 0 0 1 7 12.5v-8a4.5 4.5 0 0 1 9 0v1.379zm0 4.242V12.5a4.5 4.5 0 0 1-6.44 4.061l.764-.764A3.5 3.5 0 0 0 15 12.5v-1.379l1-1zM2.5 22.207l-.707-.707L21.5 1.793l.707.707L2.5 22.207z', id: 'microphoneOff24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'microphoneOff24_svg__b' },
                React.createElement("use", { xlinkHref: '#microphoneOff24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#microphoneOff24_svg__a' }),
            React.createElement("g", { mask: 'url(#microphoneOff24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgMicrophoneOff24.displayName = 'SvgMicrophoneOff24';
export default withStyles(styles)(SvgMicrophoneOff24);
//# sourceMappingURL=MicrophoneOff24.js.map