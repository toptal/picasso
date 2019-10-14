import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 16;
const SvgCertificate16 = forwardRef(function SvgCertificate16(props, ref) {
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
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(...classes), style: svgStyle, color: svgColor, ref: ref },
        React.createElement("path", { d: 'M14 10.663a3.486 3.486 0 0 1-1.5.337c-.537 0-1.045-.12-1.5-.337v3.165l1.5-.45 1.5.45v-3.165zm1-.714v5.223l-2.5-.75-2.5.75V9.949a3.5 3.5 0 1 1 5 0zM1 16H0V0h13v3h-1V1H1v14h8v1H1zm11.5-6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z' })));
});
SvgCertificate16.displayName = 'SvgCertificate16';
export default withStyles(styles)(SvgCertificate16);
//# sourceMappingURL=Certificate16.js.map