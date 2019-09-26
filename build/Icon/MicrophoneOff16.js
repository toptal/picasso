import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgMicrophoneOff16 = forwardRef(function SvgMicrophoneOff16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M5.497 12.624l.79-.79A4.504 4.504 0 0 0 12 7.5h1a5.5 5.5 0 0 1-5 5.478V15h3v1H4v-1h3v-2.022a5.468 5.468 0 0 1-1.503-.354zm-2.406-1.836A5.476 5.476 0 0 1 2 7.5h1c0 .956.298 1.843.807 2.572l-.716.716zm7.862-7.862L10 3.879V3.5a2.5 2.5 0 0 0-5 0v4c0 .401.094.78.262 1.116l-.734.734A3.484 3.484 0 0 1 4 7.5v-4a3.5 3.5 0 0 1 6.953-.574zM11 7.12V7.5a3.5 3.5 0 0 1-3.86 3.482l1.09-1.09a2.506 2.506 0 0 0 1.662-1.663L11 7.121zm-9.5 8.086L.793 14.5 14.5.793l.707.707L1.5 15.207z', id: 'microphoneOff16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'microphoneOff16_svg__b' },
                React.createElement("use", { xlinkHref: '#microphoneOff16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#microphoneOff16_svg__a' }),
            React.createElement("g", { mask: 'url(#microphoneOff16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgMicrophoneOff16.displayName = 'SvgMicrophoneOff16';
export default withStyles(styles)(SvgMicrophoneOff16);
//# sourceMappingURL=MicrophoneOff16.js.map