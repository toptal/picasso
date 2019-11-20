import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import kebabToCamelCase from '../utils/kebab-to-camel-case';
import styles from './styles';
const BASE_SIZE = 24;
const SvgTelegram24 = forwardRef(function SvgTelegram24(props, ref) {
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
        React.createElement("path", { d: 'M12 0C5.371 0 0 5.371 0 12s5.371 12 12 12 12-5.371 12-12S18.629 0 12 0zm5.894 8.221l-1.97 9.28c-.145.659-.537.818-1.084.509l-3-2.212-1.446 1.394c-.16.16-.296.295-.605.295l.213-3.053 5.56-5.023c.241-.213-.054-.334-.373-.12l-6.871 4.325-2.962-.924c-.643-.203-.658-.644.136-.953l11.57-4.462c.536-.193 1.006.131.832.944z' })));
});
SvgTelegram24.displayName = 'SvgTelegram24';
export default withStyles(styles)(SvgTelegram24);
//# sourceMappingURL=Telegram24.js.map