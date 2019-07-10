"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const Popover_1 = __importDefault(require("@material-ui/core/Popover"));
const RootRef_1 = __importDefault(require("@material-ui/core/RootRef"));
const Picasso_1 = require("../Picasso");
const DropdownArrow_1 = __importDefault(require("../DropdownArrow"));
const styles_2 = __importDefault(require("./styles"));
const DropdownContext = react_1.default.createContext(null);
function useDropdownContext() {
    const context = react_1.useContext(DropdownContext);
    if (!context) {
        throw new Error(`Dropdown compound components cannot be rendered outside the Dropdown component`);
    }
    return context;
}
exports.Dropdown = (_a) => {
    var { classes, className, style, children, content, offset, transformOrigin, anchorOrigin, disableAutoClose, disableAutoFocus, onOpen, onClose } = _a, rest = __rest(_a, ["classes", "className", "style", "children", "content", "offset", "transformOrigin", "anchorOrigin", "disableAutoClose", "disableAutoFocus", "onOpen", "onClose"]);
    const contentRef = react_1.useRef();
    const [anchorEl, setAnchorEl] = react_1.useState(undefined);
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
    const paperMargins = react_1.useMemo(() => (Object.assign({}, (offset.top && { marginTop: Picasso_1.spacingToEm(offset.top) }), (offset.bottom && { marginBottom: Picasso_1.spacingToEm(offset.bottom) }), (offset.left && { marginLeft: Picasso_1.spacingToEm(offset.left) }), (offset.right && { marginRight: Picasso_1.spacingToEm(offset.right) }))), [offset]);
    // here you can expose other methods, states to child components
    const context = react_1.useMemo(() => ({
        close: () => close(true)
    }), [close]);
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    react_1.default.createElement("div", Object.assign({}, rest, { className: classnames_1.default(classes.root, className), style: style }),
        react_1.default.createElement("div", { className: classes.anchor, onClick: handleAnchorClick }, children),
        react_1.default.createElement(Popover_1.default, { open: open, anchorEl: anchorEl, 
            // MUI has a wrong typing for onClose prop without `reason` argument
            // @ts-ignore
            onClose: handlePopoverClose, onEntering: handlePopoverEntering, anchorOrigin: anchorOrigin, transformOrigin: transformOrigin, disableAutoFocus: disableAutoFocus, PaperProps: {
                style: Object.assign({}, paperMargins),
                elevation: 2
            } },
            react_1.default.createElement("div", { className: classes.content, onClick: handleContentClick, onKeyDown: handleContentKeyDown },
                react_1.default.createElement(DropdownContext.Provider, { value: context },
                    react_1.default.createElement(RootRef_1.default, { rootRef: contentRef }, content))))));
};
exports.Dropdown.defaultProps = {
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
    },
    disableAutoClose: false,
    disableAutoFocus: false,
    offset: {},
    onClose: () => { },
    onOpen: () => { },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'right'
    }
};
exports.Dropdown.displayName = 'Dropdown';
exports.Dropdown.Arrow = DropdownArrow_1.default;
exports.Dropdown.useContext = useDropdownContext;
exports.default = styles_1.withStyles(styles_2.default)(exports.Dropdown);
//# sourceMappingURL=Dropdown.js.map