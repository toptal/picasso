import React from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
const BASE_SIZE = 16;
const SvgAmex16 = (props) => {
    const { classes, className, style = {}, color, scale, size } = props;
    if (size) {
        window.console.warn(`'size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = `${BASE_SIZE * Math.ceil(scale || 1)}px`;
    const svgStyle = Object.assign({ minWidth: scaledSize, minHeight: scaledSize }, style);
    return (React.createElement("svg", { viewBox: '0 0 16 16', className: cx(classes.root, className), style: svgStyle, color: color },
        React.createElement("g", { fillRule: 'evenodd' },
            React.createElement("rect", { y: 2, rx: 1 }),
            React.createElement("path", { d: 'M4.985 9.5H4.33l-.26-.681H2.884l-.246.681H2l1.159-3h.635l1.19 3zM3.879 8.313L3.469 7.2l-.402 1.113h.812zM5.295 9.5v-3h.9l.539 2.046.534-2.046h.9v3H7.61V7.138L7.02 9.5h-.578l-.589-2.362V9.5h-.558zm3.47 0v-3h2.206v.508H9.366v.665h1.493v.505H9.366v.817h1.661V9.5H8.765zm2.47 0l1.016-1.565L11.33 6.5h.702l.596.964.585-.964h.696l-.926 1.457L14 9.5h-.724l-.66-1.038-.661 1.038h-.72z' }))));
};
SvgAmex16.displayName = 'SvgAmex16';
export default withStyles(styles)(SvgAmex16);
//# sourceMappingURL=Amex16.js.map