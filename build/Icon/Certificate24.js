import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgCertificate24 = forwardRef(function SvgCertificate24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M15 17.4v4.166l2.5-1.667 2.5 1.667V17.4c-.75.384-1.6.6-2.5.6-.9 0-1.75-.216-2.5-.6zm-1-.657a5.5 5.5 0 1 1 7 0v6.691l-3.5-2.333-3.5 2.333v-6.691zM2 23H1V1h17v5h-1V2H2v20h11v1H2zm15.5-6a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z', id: 'certificate24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'certificate24_svg__b' },
                React.createElement("use", { xlinkHref: '#certificate24_svg__a' })),
            React.createElement("use", { xlinkHref: '#certificate24_svg__a' }),
            React.createElement("g", { mask: 'url(#certificate24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgCertificate24.displayName = 'SvgCertificate24';
export default withStyles(styles)(SvgCertificate24);
//# sourceMappingURL=Certificate24.js.map