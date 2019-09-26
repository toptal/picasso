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
import React, { forwardRef, useRef, useState, useContext, useMemo } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import { spacingToEm, usePicassoRoot } from '../Picasso';
import DropdownArrow from '../DropdownArrow';
import Popover from '../Popover';
import styles from './styles';
const DropdownContext = React.createContext(null);
function useDropdownContext() {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error(`Dropdown compound components cannot be rendered outside the Dropdown component`);
    }
    return context;
}
// eslint-disable-next-line react/display-name
export const Dropdown = forwardRef(function Dropdown(_a, ref) {
    var { classes, className, style, children, content, offset, transformOrigin, anchorOrigin, disableAutoClose, disableAutoFocus, onOpen, onClose } = _a, rest = __rest(_a, ["classes", "className", "style", "children", "content", "offset", "transformOrigin", "anchorOrigin", "disableAutoClose", "disableAutoFocus", "onOpen", "onClose"]);
    const contentRef = useRef();
    const [anchorEl, setAnchorEl] = useState(undefined);
    const open = Boolean(anchorEl);
    const handleAnchorClick = (event) => {
        setAnchorEl(event.currentTarget);
        onOpen();
    };
    const handlePopoverEntering = () => focus();
    const handlePopoverClose = (_, reason) => {
        // Always close menu regardless of disableAutoClose
        if (reason === 'backdropClick') {
            return close(true);
        }
        close();
    };
    const handleContentClick = () => {
        close();
    };
    const handleContentKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
        }
        // Always close menu regardless of disableAutoClose
        if (event.key === 'Escape') {
            close(true);
        }
        if (event.key === 'Enter') {
            close();
        }
        if (event.key === ' ') {
            close();
        }
    };
    const close = (force = false) => {
        if (!force && disableAutoClose) {
            return;
        }
        setAnchorEl(undefined);
        onClose();
    };
    const focus = () => {
        if (disableAutoFocus) {
            return;
        }
        if (!contentRef || !contentRef.current) {
            return;
        }
        const { firstChild } = contentRef.current;
        // TODO: add focusable interface to Picasso.Menu and other components that expose focus
        // @ts-ignore
        if (firstChild && firstChild.focus) {
            // @ts-ignore
            return firstChild.focus();
        }
        if (contentRef.current.focus) {
            return contentRef.current.focus();
        }
    };
    const paperMargins = useMemo(() => (Object.assign({}, (offset.top && { marginTop: spacingToEm(offset.top) }), (offset.bottom && { marginBottom: spacingToEm(offset.bottom) }), (offset.left && { marginLeft: spacingToEm(offset.left) }), (offset.right && { marginRight: spacingToEm(offset.right) }))), [offset]);
    // here you can expose other methods, states to child components
    const context = useMemo(() => ({
        close: () => close(true)
    }), [close]);
    const container = usePicassoRoot();
    return (React.createElement("div", Object.assign({}, rest, { ref: ref, className: cx(classes.root, className), style: style }),
        React.createElement("div", { className: classes.anchor, onClick: handleAnchorClick }, children),
        React.createElement(Popover, { classes: { paper: classes.paper }, open: open, anchorEl: anchorEl, 
            // MUI has a wrong typing for onClose prop without `reason` argument
            // @ts-ignore
            onClose: handlePopoverClose, onEntering: handlePopoverEntering, anchorOrigin: anchorOrigin, transformOrigin: transformOrigin, disableAutoFocus: disableAutoFocus, PaperProps: {
                style: Object.assign({}, paperMargins),
                elevation: 2
            }, container: container },
            React.createElement("div", { className: classes.content, onClick: handleContentClick, onKeyDown: handleContentKeyDown },
                React.createElement(DropdownContext.Provider, { value: context },
                    React.createElement(RootRef, { rootRef: contentRef }, content))))));
});
Dropdown.defaultProps = {
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
    },
    disableAutoClose: false,
    disableAutoFocus: true,
    offset: {},
    onClose: () => { },
    onOpen: () => { },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'right'
    }
};
Dropdown.displayName = 'Dropdown';
Dropdown.Arrow = DropdownArrow;
Dropdown.useContext = useDropdownContext;
export default withStyles(styles)(Dropdown);
//# sourceMappingURL=Dropdown.js.map