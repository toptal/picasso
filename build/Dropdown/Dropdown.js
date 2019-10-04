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
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import RootRef from '@material-ui/core/RootRef';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import React, { forwardRef, useContext, useMemo, useRef, useState } from 'react';
import DropdownArrow from '../DropdownArrow';
import Paper from '../Paper';
import { spacingToEm } from '../Picasso';
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
    var { classes, className, style, children, content, offset, transformOrigin, anchorOrigin, placement, disableAutoClose, disableAutoFocus, onOpen, onClose } = _a, rest = __rest(_a, ["classes", "className", "style", "children", "content", "offset", "transformOrigin", "anchorOrigin", "placement", "disableAutoClose", "disableAutoFocus", "onOpen", "onClose"]);
    if (anchorOrigin) {
        // eslint-disable-next-line no-console
        console.warn('DEPRECATED in Dropdown: "anchorOrigin". To control popper position, please use "placement" and "offset" props.');
    }
    if (transformOrigin) {
        // eslint-disable-next-line no-console
        console.warn('DEPRECATED in Dropdown: "transformOrigin". To control popper position, please use "placement" and "offset" props.');
    }
    const contentRef = useRef();
    const [anchorEl, setAnchorEl] = useState(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const open = (event) => {
        setAnchorEl(event.currentTarget);
        setIsOpen(true);
        onOpen();
    };
    const toggleOpen = (event) => {
        if (isOpen) {
            close();
        }
        else {
            open(event);
        }
    };
    const handleContentKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
        }
        // Always close menu regardless of disableAutoClose
        if (event.key === 'Escape') {
            forceClose();
        }
        if (event.key === 'Enter') {
            close();
        }
        if (event.key === ' ') {
            close();
        }
    };
    const close = () => {
        if (disableAutoClose) {
            return;
        }
        forceClose();
    };
    const forceClose = () => {
        setAnchorEl(undefined);
        setIsOpen(false);
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
        close: () => forceClose()
    }), [close]);
    return (React.createElement("div", Object.assign({}, rest, { ref: ref, className: cx(classes.root, className), style: style }),
        React.createElement("div", { className: classes.anchor, onClick: toggleOpen }, children),
        anchorEl && (React.createElement(Popper, { className: classes.popper, open: isOpen, anchorEl: anchorEl, popperOptions: {
                onCreate: focus
            }, placement: placement, style: paperMargins, 
            // RATIONALE: If portal is enabled, and dropdown's popper contains
            // for example <Input autoFocus/>, popper will mount to the portal and
            // before it finishes posotioning itself, autoFocus will force scrolling
            // to the bottom of the portal.
            disablePortal: true },
            React.createElement(ClickAwayListener, { onClickAway: () => forceClose() },
                React.createElement(Grow, { in: isOpen, appear: true },
                    React.createElement(Paper, { className: classes.content, onClick: () => close(), onKeyDown: handleContentKeyDown, elevation: 2 },
                        React.createElement(DropdownContext.Provider, { value: context },
                            React.createElement(RootRef, { rootRef: contentRef }, content)))))))));
});
Dropdown.defaultProps = {
    disableAutoClose: false,
    disableAutoFocus: true,
    offset: {},
    onClose: () => { },
    onOpen: () => { },
    placement: 'bottom-end'
};
Dropdown.displayName = 'Dropdown';
Dropdown.Arrow = DropdownArrow;
Dropdown.useContext = useDropdownContext;
export default withStyles(styles)(Dropdown);
//# sourceMappingURL=Dropdown.js.map