var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { PureComponent } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Image from '../Image';
import Logo from '../Logo';
import Typography from '../Typography';
import getNameInitials from '../utils/get-name-initials';
import styles from './styles';
export class Avatar extends PureComponent {
    renderLogo() {
        const { classes, src, size } = this.props;
        if (!src || ['small', 'xsmall', 'xxsmall'].includes(size)) {
            return null;
        }
        return (React.createElement("div", { className: classes.logoContainer },
            React.createElement(Logo, { emblem: true, variant: 'white', className: classes.logo })));
    }
    renderInitials() {
        const { classes, src, name } = this.props;
        if (src || !name) {
            return null;
        }
        return (React.createElement(Typography, { className: classes.text, invert: true }, getNameInitials(name)));
    }
    render() {
        const _a = this.props, { alt, src, classes, className, name, size, style, variant } = _a, rest = __rest(_a, ["alt", "src", "classes", "className", "name", "size", "style", "variant"]);
        const sizeClassName = classes[size];
        const variantClassName = classes[variant];
        return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        React.createElement("div", Object.assign({}, rest, { className: cx(classes.root, sizeClassName) }),
            src ? (React.createElement(Image, { alt: alt || name, className: cx(classes.image, variantClassName, sizeClassName, classes.clippedCorner, className), src: src, style: style })) : (React.createElement("div", { className: cx(classes.textContainer, variantClassName, sizeClassName, classes.clippedCorner, className) })),
            this.renderInitials(),
            this.renderLogo()));
    }
}
Avatar.defaultProps = {
    size: 'xsmall',
    variant: 'square'
};
Avatar.displayName = 'Avatar';
export default withStyles(styles)(Avatar);
//# sourceMappingURL=Avatar.js.map