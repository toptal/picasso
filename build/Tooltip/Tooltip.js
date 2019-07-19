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
const styles_1 = require("@material-ui/core/styles");
const Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
const classnames_1 = __importDefault(require("classnames"));
const Picasso_1 = require("../Picasso");
const styles_2 = __importDefault(require("./styles"));
const getPopperProps = (arrow, arrowRef, container) => ({
    container,
    popperOptions: {
        modifiers: {
            arrow: {
                enabled: arrow,
                element: arrowRef
            }
        }
    }
});
const getClasses = (classes, variant) => {
    const isLight = variant === 'light';
    return {
        popper: isLight ? classes.arrowPopperLight : classes.arrowPopper,
        tooltip: classnames_1.default(classes.tooltip, {
            [classes.light]: isLight
        })
    };
};
exports.Tooltip = (_a) => {
    var { content, children, placement, interactive, classes, className, style, arrow, open, onClose, onOpen, variant, trigger } = _a, rest = __rest(_a, ["content", "children", "placement", "interactive", "classes", "className", "style", "arrow", "open", "onClose", "onOpen", "variant", "trigger"]);
    const [arrowRef, setArrowRef] = react_1.useState(null);
    const container = Picasso_1.usePicassoRoot();
    const title = (react_1.default.createElement(react_1.Fragment, null,
        content,
        arrow && (react_1.default.createElement("span", { className: classes.arrow, 
            // @ts-ignore
            ref: setArrowRef }))));
    return (react_1.default.createElement(Tooltip_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { PopperProps: getPopperProps(arrow, arrowRef, container), classes: getClasses(classes, variant), className: className, style: style, disableHoverListener: trigger === 'click', interactive: interactive, onClose: onClose, onOpen: onOpen, open: open, placement: placement, title: title }), children));
};
exports.Tooltip.defaultProps = {
    arrow: true,
    placement: 'top',
    trigger: 'hover',
    variant: 'dark'
};
exports.default = styles_1.withStyles(styles_2.default)(exports.Tooltip);
//# sourceMappingURL=Tooltip.js.map