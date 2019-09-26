import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 24;
const SvgPortfolioFinance24 = forwardRef(function SvgPortfolioFinance24(props, ref) {
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
            React.createElement("path", { d: 'M1.106 15.447L12 20.882l10.894-5.435L24 16l-12 6-12-6 1.106-.553zm0-4L12 16.882l10.894-5.435L24 12l-12 6-12-6 1.106-.553zM0 8l12-6 12 6-12 6L0 8zm12 4.882L21.764 8 12 3.118 2.236 8 12 12.882z', id: 'portfolioFinance24_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'portfolioFinance24_svg__b' },
                React.createElement("use", { xlinkHref: '#portfolioFinance24_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#portfolioFinance24_svg__a' }),
            React.createElement("g", { mask: 'url(#portfolioFinance24_svg__b)' },
                React.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgPortfolioFinance24.displayName = 'SvgPortfolioFinance24';
export default withStyles(styles)(SvgPortfolioFinance24);
//# sourceMappingURL=PortfolioFinance24.js.map