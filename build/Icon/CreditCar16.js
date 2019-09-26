import React from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgCreditCar16 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgCreditCar16';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color },
        React.createElement("defs", null,
            React.createElement("path", { d: 'M15 5V3H1v2h14zm0 1H1v7h14V6zM1 2h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm1 6h5v1H2V8zm0 2h3v1H2v-1zm9-2h3v1h-3V8z', id: 'creditCar16_svg__a' })),
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("mask", { id: 'creditCar16_svg__b' },
                React.createElement("use", { xlinkHref: '#creditCar16_svg__a' })),
            React.createElement("use", { fillRule: 'nonzero', xlinkHref: '#creditCar16_svg__a' }),
            React.createElement("g", { mask: 'url(#creditCar16_svg__b)' },
                React.createElement("path", { d: 'M0 0h16v16H0z' })))));
};
SvgCreditCar16.displayName = 'SvgCreditCar16';
export default withStyles(styles)(SvgCreditCar16);
//# sourceMappingURL=CreditCar16.js.map