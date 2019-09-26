import React, { forwardRef } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Logo as LogoIcon, LogoEmblem as LogoEmblemIcon } from '../Icon';
import styles from './styles';
export const Logo = forwardRef(function Logo({ classes, emblem, variant, style, className }, ref) {
    const rootClass = emblem ? classes.logoEmblem : classes.logo;
    const colorClass = classes[variant];
    const LogoComponent = emblem ? LogoEmblemIcon : LogoIcon;
    return (React.createElement(LogoComponent, { ref: ref, className: cx(rootClass, colorClass, className), style: style }));
});
Logo.defaultProps = {
    variant: 'default'
};
Logo.displayName = 'Logo';
export default withStyles(styles)(Logo);
//# sourceMappingURL=Logo.js.map