import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgLegalInfo24 = forwardRef(function SvgLegalInfo24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M16 0l6 6v18H2V0h14zm-.414 1H3v22h18V6.414L15.586 1zM13 17h3v1H9v-1h3v-7H9V9h4v8zM11 7h2v1h-2V7z', id: 'legalInfo24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'legalInfo24_svg__b' },
                React.createElement("use", { xlinkHref: '#legalInfo24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#legalInfo24_svg__a' }),
            React.createElement("g", { mask: 'url(#legalInfo24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgLegalInfo24.displayName = 'SvgLegalInfo24';
export default withStyles(styles)(SvgLegalInfo24);
//# sourceMappingURL=LegalInfo24.js.map