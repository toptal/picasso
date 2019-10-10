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
import React from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Image from '../Image';
import Logo from '../Logo';
import Typography from '../Typography';
import getNameInitials from '../utils/get-name-initials';
import styles from './styles';
const isBrowserSupportsObjectFit = 'objectFit' in document.documentElement.style;
const renderLogo = ({ classes, src, size }) => {
    if (!src || ['small', 'xsmall', 'xxsmall'].includes(size)) {
        return null;
    }
    return (React.createElement("div", { className: classes.logoContainer },
        React.createElement(Logo, { emblem: true, variant: 'white', className: classes.logo })));
};
const renderInitials = ({ classes, src, name }) => {
    if (src || !name) {
        return null;
    }
    return (React.createElement(Typography, { className: classes.text, invert: true }, getNameInitials(name)));
};
// You will be surprised, but it's a IE11 fix for `object-fit: cover` for images
const IE11Image = (_a) => {
    var { style, src } = _a, rest = __rest(_a, ["style", "src"]);
    return (React.createElement("div", Object.assign({ style: Object.assign({ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center center' }, style) }, rest)));
};
export const Avatar = (_a) => {
    var { alt, src, classes, className, name, size, style, variant } = _a, rest = __rest(_a, ["alt", "src", "classes", "className", "name", "size", "style", "variant"]);
    const sizeClassName = classes[size];
    const variantClassName = classes[variant];
    const InputComponent = isBrowserSupportsObjectFit ? Image : IE11Image;
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    React.createElement("div", Object.assign({}, rest, { className: cx(classes.root, sizeClassName) }),
        src ? (React.createElement(InputComponent, { alt: alt || name, className: cx(classes.image, variantClassName, sizeClassName, classes.clippedCorner, className), src: src, style: style })) : (React.createElement("div", { className: cx(classes.textContainer, variantClassName, sizeClassName, classes.clippedCorner, className) })),
        renderInitials({ classes, src, name }),
        renderLogo({ classes, src, size })));
};
Avatar.defaultProps = {
    size: 'xsmall',
    variant: 'square'
};
Avatar.displayName = 'Avatar';
export default withStyles(styles)(Avatar);
//# sourceMappingURL=Avatar.js.map