import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 24;
const SvgPortfolioDesigner24 = forwardRef(function SvgPortfolioDesigner24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 24 24', className: cx(classes.root, className), style: svgStyle, color: color, ref: ref },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M1 1h9v9H1V1zm1 1v7h7V2H2zm12-1h9v9h-9V1zm1 1v7h7V2h-7zM1 14h9v9H1v-9zm1 8h7v-7H2v7zm12-8h9v9h-9v-9zm1 8h7v-7h-7v7z', id: 'portfolioDesigner24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'portfolioDesigner24_svg__b' },
                React.createElement("use", { xlinkHref: '#portfolioDesigner24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#portfolioDesigner24_svg__a' }),
            React.createElement("g", { mask: 'url(#portfolioDesigner24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgPortfolioDesigner24.displayName = 'SvgPortfolioDesigner24';
export default withStyles(styles)(SvgPortfolioDesigner24);
//# sourceMappingURL=PortfolioDesigner24.js.map