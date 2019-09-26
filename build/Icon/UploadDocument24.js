import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgUploadDocument24 = forwardRef(function SvgUploadDocument24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M19 13h-1V2H2v20h11v1H1V1h18v12zM4 7h12v1H4V7zm0 3h12v1H4v-1zm0 3h5v1H4v-1zm15 3.707V23h-1v-6.293l-2.5 2.5-.707-.707 3.707-3.707.707.707 3 3-.707.707-2.5-2.5z', id: 'uploadDocument24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'uploadDocument24_svg__b' },
                React.createElement("use", { xlinkHref: '#uploadDocument24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#uploadDocument24_svg__a' }),
            React.createElement("g", { mask: 'url(#uploadDocument24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgUploadDocument24.displayName = 'SvgUploadDocument24';
export default withStyles(styles)(SvgUploadDocument24);
//# sourceMappingURL=UploadDocument24.js.map