import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgSettings16 = forwardRef(function SvgSettings16(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M6 2.341V0h4v2.341a5.994 5.994 0 0 1 1.9 1.098l2.028-1.171 2 3.464L13.9 6.903a6.034 6.034 0 0 1 0 2.194l2.028 1.17-2 3.465-2.029-1.171A5.994 5.994 0 0 1 10 13.659V16H6v-2.341a5.994 5.994 0 0 1-1.9-1.098l-2.028 1.171-2-3.464L2.1 9.097a6.034 6.034 0 0 1 0-2.194L.072 5.733l2-3.465L4.1 3.439A5.994 5.994 0 0 1 6 2.341zM7 1v2.049l-.667.235a4.993 4.993 0 0 0-1.582.915l-.537.46-1.776-1.025-1 1.732L3.212 6.39l-.129.695a5.034 5.034 0 0 0 0 1.83l.129.695-1.774 1.024 1 1.732 1.776-1.025.537.46c.467.4 1.003.71 1.582.915L7 12.95V15h2v-2.049l.667-.235a4.993 4.993 0 0 0 1.582-.915l.537-.46 1.776 1.025 1-1.732-1.774-1.024.129-.695a5.034 5.034 0 0 0 0-1.83l-.129-.695 1.774-1.024-1-1.732-1.776 1.025-.537-.46a4.993 4.993 0 0 0-1.582-.915L9 3.05V1H7zm1 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', id: 'settings16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'settings16_svg__b' },
                React.createElement("use", { xlinkHref: '#settings16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#settings16_svg__a' }),
            React.createElement("g", { mask: 'url(#settings16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
});
SvgSettings16.displayName = 'SvgSettings16';
export default withStyles(styles)(SvgSettings16);
//# sourceMappingURL=Settings16.js.map