import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 24;
const SvgBankWire24 = forwardRef(function SvgBankWire24(props, ref) {
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
    return (React.createElement("svg", { viewBox: '0 0 32 32', className: cx(...classes), style: svgStyle, color: svgColor, ref: ref },
        React.createElement("path", { d: 'M2 26h28v4H2v-4zm1 1v2h26v-2H3zM2 8l14-6 14 6v3H2V8zm1 .66V10h26V8.66L16 3.087 3 8.659zM4 12h6v13H4V12zm1 1v11h4V13H5zm8-1h6v13h-6V12zm1 1v11h4V13h-4zm8-1h6v13h-6V12zm1 1v11h4V13h-4z' })));
});
SvgBankWire24.displayName = 'SvgBankWire24';
export default withStyles(styles)(SvgBankWire24);
//# sourceMappingURL=BankWire24.js.map