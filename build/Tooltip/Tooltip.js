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
import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUITooltip from '@material-ui/core/Tooltip';
import cx from 'classnames';
import { usePicassoRoot } from '../Picasso';
import styles from './styles';
export const Tooltip = (_a) => {
    var { content, children, placement, interactive, classes, className, style, arrow, open, onClose, onOpen, variant } = _a, rest = __rest(_a, ["content", "children", "placement", "interactive", "classes", "className", "style", "arrow", "open", "onClose", "onOpen", "variant"]);
    const [arrowRef, setArrowRef] = useState(null);
    const container = usePicassoRoot();
    const title = (React.createElement(Fragment, null,
        content,
        arrow && React.createElement("span", { className: classes.arrow, ref: setArrowRef })));
    return (React.createElement(MUITooltip
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { PopperProps: {
            container,
            popperOptions: {
                modifiers: {
                    arrow: {
                        enabled: Boolean(arrowRef),
                        element: arrowRef
                    }
                }
            }
        }, classes: {
            popper: variant === 'light' ? classes.arrowPopperLight : classes.arrowPopper,
            tooltip: cx(classes.tooltip, {
                [classes.light]: variant === 'light'
            })
        }, className: className, style: style, interactive: interactive, onClose: onClose, onOpen: onOpen, open: open, placement: placement, title: title }), children));
};
Tooltip.defaultProps = {
    arrow: true,
    placement: 'top',
    variant: 'dark'
};
export default withStyles(styles)(Tooltip);
//# sourceMappingURL=Tooltip.js.map